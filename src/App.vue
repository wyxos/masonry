<script setup>
import { onMounted, ref, nextTick } from "vue";
import { v4 as uuid } from "uuid";

const items = ref([]);
const columnCount = 4; // Number of columns for masonry layout
const containerHeight = ref(0);
const scrollContainer = ref(null);
const maxPages = 5;
const loadedPages = ref([1]); // Start with page 1 loaded
let isLoading = false;

const columnHeights = Array.from({ length: columnCount }, () => 0); // Persistent column heights across updates

onMounted(() => {
  generateItems(loadedPages.value);
  updatePositions();
  // Add scroll event listener for infinite scroll
  if (scrollContainer.value) {
    scrollContainer.value.addEventListener('scroll', handleScroll);
  }
});

const generateItems = (pages) => {
  const newItems = [];

  pages.forEach(page => {
    const startIndex = (page - 1) * 50;

    // Generate items for the current page if they haven't been generated before
    newItems.push(...Array.from({ length: 50 }, (_, index) => {
      const width = Math.floor(Math.random() * 200) + 100; // Random width between 100 and 300
      const height = Math.floor(Math.random() * 200) + 100; // Random height between 100 and 300

      return {
        id: startIndex + index,
        key: uuid(),
        title: `Item ${startIndex + index + 1}`,
        width,
        height,
        column: null,
        top: null,
      };
    }));
  });

  // Update the items array while keeping the old items in place
  items.value = [...items.value, ...newItems];
};

const loadNext = async () => {
  if (isLoading) return;
  isLoading = true;

  const nextPage = loadedPages.value[loadedPages.value.length - 1] + 1;
  loadedPages.value.push(nextPage);

  // Remove the oldest page if exceeding maxPages
  if (loadedPages.value.length > maxPages) {
    loadedPages.value.shift();
  }

  generateItems(loadedPages.value);
  await nextTick();
  updatePositions();

  isLoading = false;
};

const loadPrevious = async () => {
  if (isLoading) return;
  isLoading = true;

  const previousPage = loadedPages.value[0] - 1;
  if (previousPage > 0) {
    loadedPages.value.unshift(previousPage);

    // Remove the newest page if exceeding maxPages
    if (loadedPages.value.length > maxPages) {
      loadedPages.value.pop();
    }

    generateItems(loadedPages.value);
    await nextTick();
    updatePositions();
  }

  isLoading = false;
};

const handleScroll = () => {
  if (!scrollContainer.value) return;

  const { scrollTop, scrollHeight, clientHeight } = scrollContainer.value;

  // Load more content when user is within 100px of the bottom and not currently loading
  if (scrollTop + clientHeight >= scrollHeight - 100 && !isLoading) {
    loadNext();
  }

  // Load previous content when user is near the top and not currently loading
  if (scrollTop <= 100 && loadedPages.value[0] > 1 && !isLoading) {
    loadPrevious();
  }
};

const updatePositions = () => {
  items.value.forEach(item => {
    if (item.column === null) {
      // Calculate positions only for new items
      const column = columnHeights.indexOf(Math.min(...columnHeights));
      const top = columnHeights[column];
      item.column = column;
      item.top = top;
      columnHeights[column] += item.height + 16; // Update column height (including margin)
    }
  });

  containerHeight.value = Math.max(...columnHeights) + 100; // Update container height with some margin
};
</script>

<template>
  <div ref="scrollContainer" class="relative w-full overflow-y-scroll h-[600px]">
    <div
        v-for="item in items"
        :key="item.key"
        class="absolute"
        :style="{
        width: `${item.width}px`,
        height: `${item.height}px`,
        left: `${(item.column * 25)}%`,
        top: `${item.top}px`
      }"
    >
      <div class="w-full h-full bg-red-500 m-2">
        {{ item.title }}
        <p>{{ item.width }} x {{ item.height }}</p>
      </div>
    </div>
  </div>
  <div>{{ loadedPages }}</div>
</template>