<script setup>
import WyxosMasonry from "./components/WyxosMasonry.vue";
import { v4 as uuid } from "uuid";
import { computed, onMounted, ref } from "vue";

const pages = ref([]);

const loadNext = async () => {
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

  // Keep only the last 5 pages for caching
  if (pages.value.length > 5) {
    pages.value.shift();
  }
};

const loadPrevious = async () => {
  if (pages.value[0].page <= 1) return;

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

  // Keep only the last 5 pages for caching
  if (pages.value.length > 5) {
    pages.value.pop();
  }
};

const items = computed(() => {
  return pages.value.reduce((acc, page) => {
    return acc.concat(page.items);
  }, []);
});

const loadedPages = computed(() => {
  return pages.value.map((page) => page.page);
});

const load = async () => {
  const page = {
    page: 1,
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
}
</script>

<template>
  <div class="h-screen flex flex-col">
    <p>{{ loadedPages }}</p>
    <wyxos-masonry :load="load" :load-next="loadNext" :load-previous="loadPrevious" :items="items">
      <template #item="{ item }">
        <div>
          <img :src="item.src" :alt="item.title" />
        </div>
      </template>
    </wyxos-masonry>
  </div>
</template>