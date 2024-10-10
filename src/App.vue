<script setup>
import { computed, onMounted, ref } from "vue";
import { v4 as uuid } from "uuid";
import throttle from "lodash/throttle";

const pages = ref([]);
const infiniteScroll = ref(null);
const isLoading = ref(false);
const loadingDirection = ref('');

onMounted(() => {
  const page = {
    page: 1,
    items: Array.from({ length: 48 }, (_, index) => ({
      id: index,
      key: uuid(),
      title: `Item ${index + 1}`,
      src: `https://picsum.photos/200/200?random=${index}`,
    })),
  };

  pages.value.push(page);

  if (infiniteScroll.value) {
    infiniteScroll.value.addEventListener("scroll", throttle(onScroll, 200));
  }
});

const items = computed(() => {
  return pages.value.reduce((acc, page) => {
    return acc.concat(page.items);
  }, []);
});

const loadNext = async () => {
  if (isLoading.value) return;
  isLoading.value = true;
  loadingDirection.value = 'next';

  const page = {
    page: pages.value[pages.value.length - 1].page + 1,
    items: Array.from({ length: 48 }, (_, index) => ({
      id: index,
      key: uuid(),
      title: `Item ${index + 1}`,
      src: `https://picsum.photos/200/200?random=${index}`,
    })),
  };

  // Simulate a delay to show loading state
  await new Promise((resolve) => setTimeout(resolve, 1000));

  pages.value.push(page);
  isLoading.value = false;
  loadingDirection.value = '';

  // Keep only the last 5 pages for caching
  if (pages.value.length > 5) {
    pages.value.shift();
  }
};

const loadPrevious = async () => {
  if (isLoading.value || pages.value[0].page <= 1) return;
  isLoading.value = true;
  loadingDirection.value = 'previous';

  const currentScrollHeight = infiniteScroll.value.scrollHeight;

  const page = {
    page: pages.value[0].page - 1,
    items: Array.from({ length: 48 }, (_, index) => ({
      id: index,
      key: uuid(),
      title: `Item ${index + 1}`,
      src: `https://picsum.photos/200/200?random=${index}`,
    })),
  };

  // Simulate a delay to show loading state
  await new Promise((resolve) => setTimeout(resolve, 1000));

  pages.value.unshift(page);
  isLoading.value = false;
  loadingDirection.value = '';

  // Adjust scroll position to maintain the user's scroll point
  const newScrollHeight = infiniteScroll.value.scrollHeight;
  infiniteScroll.value.scrollTop = newScrollHeight - currentScrollHeight;

  // Keep only the last 5 pages for caching
  if (pages.value.length > 5) {
    pages.value.pop();
  }
};

const loadedPages = computed(() => {
  return pages.value.map((page) => page.page);
});

const onScroll = () => {
  if (infiniteScroll.value) {
    const { scrollTop, scrollHeight, clientHeight } = infiniteScroll.value;
    if (scrollTop + clientHeight >= scrollHeight - 10 && !isLoading.value) {
      loadNext();
    } else if (scrollTop <= 10 && !isLoading.value) {
      loadPrevious();
    }
  }
};
</script>

<template>
  <div class="h-screen flex flex-col">
    <p>{{ loadedPages }}</p>
    <div ref="infiniteScroll" class="grid grid-cols-6 gap-4 flex-1 overflow-y-scroll custom-scroll">
      <p v-if="isLoading && loadingDirection === 'previous'" class="text-center col-span-6">Loading previous content...</p>
      <div v-for="item in items" :key="item.key" class="text-center">
        <img :src="item.src" alt="item.title"/>
        <p>{{ item.title }}</p>
      </div>
      <p v-if="isLoading && loadingDirection === 'next'" class="text-center col-span-6">Loading more content...</p>
    </div>
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