<script setup>
import { computed, onMounted, ref, watch, nextTick } from "vue";
import anime from "animejs";

const props = defineProps({
  pages: Array,
  columnCount: {
    type: Number,
    default: 3,
  },
  maxPages: {
    type: Number,
    default: 5,
  },
  onLoadNext: Function,
  onLoadPrevious: Function,
  onRemoveItem: Function,
});

const items = computed(() => {
  return props.pages.reduce((acc, page) => {
    return acc.concat(page.items);
  }, []);
});

const columns = computed(() => {
  return items.value.reduce(
      (acc, item, index) => {
        acc[index % props.columnCount].push(item);
        return acc;
      },
      Array.from({ length: props.columnCount }, () => [])
  );
});

const masonryRef = ref(null);
const atBottom = ref(false);
const atTop = ref(true);
const isLoadingNext = ref(false);
const isLoadingPrevious = ref(false);

const loadNext = async () => {
  if (typeof props.onLoadNext === "function" && !isLoadingNext.value) {
    isLoadingNext.value = true;
    await props.onLoadNext();
    // Ensure the number of pages does not exceed maxPages
    if (props.pages.length > props.maxPages) {
      props.pages.shift();
    }
    isLoadingNext.value = false;
    await nextTick();
    animateReLayout();
  }
};

const loadPrevious = async () => {
  if (
      typeof props.onLoadPrevious === "function" &&
      !isLoadingPrevious.value &&
      props.pages[0]?.page !== 1
  ) {
    isLoadingPrevious.value = true;
    await props.onLoadPrevious();
    isLoadingPrevious.value = false;
    await nextTick();
    animateReLayout();
  }
};

const handleScroll = () => {
  if (!masonryRef.value) return;

  if (isLoadingNext.value || isLoadingPrevious.value) return;

  const { scrollTop, scrollHeight, clientHeight } = masonryRef.value;

  atBottom.value = scrollTop + clientHeight >= scrollHeight - 10; // Adjust threshold as needed
  atTop.value = scrollTop <= 10;

  if (atBottom.value) {
    loadNext();
  } else if (atTop.value) {
    loadPrevious();
  }
};

const animateRemoval = (itemId) => {
  const itemElement = document.getElementById(`item-${itemId}`);
  if (itemElement) {
    // Clone the element to animate the removal
    const clone = itemElement.cloneNode(true);
    clone.style.position = "absolute";
    const rect = itemElement.getBoundingClientRect();
    clone.style.top = `${rect.top}px`;
    clone.style.left = `${rect.left}px`;
    clone.style.width = `${rect.width}px`;
    clone.style.height = `${rect.height}px`;
    document.body.appendChild(clone);

    // Animate the clone
    anime({
      targets: clone,
      opacity: [1, 0],
      translateX: [0, -50],
      duration: 500,
      easing: "easeInOutQuad",
      complete: async () => {
        document.body.removeChild(clone);
        props.onRemoveItem(itemId);
        await nextTick();
        animateReLayout();
      },
    });
  }
};

const animateReLayout = () => {
  const itemElements = document.querySelectorAll(".item");
  anime({
    targets: itemElements,
    translateX: 0,
    translateY: 0,
    duration: 500,
    easing: "easeInOutQuad",
    delay: anime.stagger(50),
  });
};

onMounted(() => {
  if (masonryRef.value) {
    masonryRef.value.addEventListener("scroll", handleScroll);
  }
});
</script>

<template>
  <div class="masonry-container overflow-hidden h-screen flex flex-col">
    <div ref="masonryRef" class="masonry flex-1 flex flex-col overflow-auto">
      <button
          v-if="props.pages[0]?.page !== 1"
          class="scroll-button fixed left-1/2 transform -translate-x-1/2 bg-blue-500 text-white border-none py-2 px-4 cursor-pointer transition-colors duration-300 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          @click="loadPrevious"
          :disabled="isLoadingPrevious"
      >
        Load Previous
      </button>
      <div class="flex-1 flex">
        <div v-for="(column, index) in columns" :key="index" class="flex-1">
          <figure v-for="(item, itemIndex) in column" :key="item.id" :id="`item-${item.id}`" class="item" :data-item-id="item.id">
            <img :src="item.src" :alt="item.alt" class="min-h-[100px]" />
            <button
                @click="() => { animateRemoval(item.id); }"
                class="remove-button bg-red-500 text-white border-none py-1 px-2 cursor-pointer mt-1 transition-colors duration-300 hover:bg-red-700"
            >
              Remove
            </button>
            {{ item.id }}
          </figure>
        </div>
      </div>
      <button class="scroll-button" @click="loadNext" :disabled="isLoadingNext">Load Next</button>
    </div>
  </div>
</template>

<style scoped>
.item {
  position: relative;
  transition: transform 0.5s ease-in-out;
}
.masonry-container {
  position: relative;
}
</style>

<script>
export default {
  name: "Masonry",
};
</script>