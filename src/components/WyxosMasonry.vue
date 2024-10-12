<script setup>
import {ref, onMounted, nextTick, defineEmits, computed, onBeforeUnmount} from "vue";
import throttle from "lodash/throttle";

const emit = defineEmits([
  "updatePages",
]);

const isLoading = ref(false);
const loadingDirection = ref("");

const props = defineProps({
  load: Function,
  loadNext: Function,
  loadPrevious: Function,
  pages: Array
});

const infiniteScroll = ref(null);
const ready = ref(false);

onMounted(async () => {
  // Emit event to indicate initial content is ready
  const page = await props.load?.();
  const updatedPages = [page];
  emit("updatePages", updatedPages);


  ready.value = true;

  if (infiniteScroll.value) {
    infiniteScroll.value.addEventListener("scroll", throttle(onScroll, 200));
  }
});

onBeforeUnmount(() => {
  if (infiniteScroll.value) {
    infiniteScroll.value.removeEventListener("scroll", throttle(onScroll, 200));
  }
});

let previousScrollTop = 0;

const onScroll = () => {
  if (infiniteScroll.value) {
    const { scrollTop, scrollHeight, clientHeight } = infiniteScroll.value;

    // Determine if the user is scrolling up or down
    const isScrollingDown = scrollTop > previousScrollTop;

    // Update previous scroll position
    previousScrollTop = scrollTop;

    if (isScrollingDown) {
      if (scrollTop + clientHeight >= scrollHeight - 10 && !isLoading.value) {
        console.log("Load next");
        loadNext();
      }
    } else {
      if (scrollTop <= 10 && !isLoading.value) {
        console.log("Load previous");
        loadPrevious();
      }
    }
  }
};

const loadNext = async () => {
  if (isLoading.value) return;
  isLoading.value = true;
  loadingDirection.value = "next";

  const page = await props.loadNext?.();
  const updatedPages = [...props.pages, page];
  emit("updatePages", updatedPages);
  await nextTick(); // Wait for the DOM to be updated after new items are loaded

  isLoading.value = false;
  loadingDirection.value = "";

  // Remove the oldest page if there are more than 5 pages
  if (props.pages.length > 5) {
    const updatedPages = props.pages.slice(1); // Remove the first page
    emit("updatePages", updatedPages); // Emit updated pages to parent
  }
};

const loadPrevious = async () => {
  if (isLoading.value) return;
  isLoading.value = true;
  loadingDirection.value = "previous";

  // Load previous items
  const page = await props.loadPrevious?.();
  const updatedPages = [page, ...props.pages];
  emit("updatePages", updatedPages);
  await nextTick(); // Wait for the DOM to be updated after new items are loaded

  isLoading.value = false;
  loadingDirection.value = "";

  // Remove the last page if there are more than 5 pages
  if (props.pages.length > 5) {
    const updatedPages = props.pages.slice(0, -1); // Remove the last page
    emit("updatePages", updatedPages); // Emit updated pages to parent
  }
};

const items = computed(() => {
  return props.pages.reduce((acc, page) => {
    return acc.concat(page.items);
  }, []);
});


</script>

<template>
  <div ref="infiniteScroll" class="infinite-scroll flex-1 flex flex-col overflow-auto custom-scroll">
    <p v-if="isLoading && loadingDirection === 'previous'" class="text-center">Loading previous content...</p>
    <div class="grid grid-cols-6 flex-1" v-if="ready">
      <div v-for="item in items" :key="item.key" :data-key="item.key">
        <slot name="item" :item="item">
          <img :src="item.src" :alt="item.title"/>
        </slot>
      </div>
    </div>
    <p v-if="!ready">Loading content...</p>
    <p v-if="isLoading && loadingDirection === 'next'" class="text-center">Loading more content...</p>
  </div>
</template>

<style scoped>
.custom-scroll {
  scrollbar-width: thin;
  scrollbar-color: #4a5568 #e2e8f0;
}

.custom-scroll::-webkit-scrollbar {
  width: 8px;
}

.custom-scroll::-webkit-scrollbar-track {
  background: #e2e8f0;
}

.custom-scroll::-webkit-scrollbar-thumb {
  background-color: #4a5568;
  border-radius: 10px;
  border: 2px solid #e2e8f0;
}
</style>
