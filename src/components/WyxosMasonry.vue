<script setup>
import { computed, onMounted, ref, watch } from "vue";
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
          <figure v-for="(item, itemIndex) in column" :key="item.id" :id="`item-${item.id}`" class="item">
            <img :src="item.src" :alt="item.alt" class="min-h-[100px]" />
            <button
                @click="() => { props.onRemoveItem(item.id); }"
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
}
</style>

<script>
export default {
  name: "Masonry",
};
</script>