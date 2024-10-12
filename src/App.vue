<script setup>
import WyxosMasonry from "./components/WyxosMasonry.vue";
import { v4 as uuid } from "uuid";
import { computed, onMounted, ref } from "vue";

const pages = ref([]);

const loadNext = async () => {
  let pageValue = pages.value[pages.value.length - 1].page + 1;
  const page = {
    page: pageValue,
    items: Array.from({ length: 48 }, (_, index) => ({
      id: index,
      key: uuid(),
      title: `Item ${(pageValue * index) + 1}`,
      src: `https://picsum.photos/200/200?random=${index}`,
    })),
  };

  // Simulate a delay to show loading state
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return page
};

const loadPrevious = async () => {
  if (pages.value[0].page <= 1) return;

  let pageValue = pages.value[0].page - 1;
  const page = {
    page: pageValue,
    items: Array.from({ length: 48 }, (_, index) => ({
      id: index,
      key: uuid(),
      title: `Item ${(pageValue * index) + 1}`,
      src: `https://picsum.photos/200/200?random=${index}`,
    })),
  };

  // Simulate a delay to show loading state
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return page
};

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


  return page
}

const handleUpdatePages = (updatedPages) => {
  pages.value = updatedPages;
};
</script>

<template>
  <div class="h-screen flex flex-col">
    <p>{{ loadedPages }}</p>
    <wyxos-masonry :load="load" :load-next="loadNext" :load-previous="loadPrevious" :pages="pages"
                   @updatePages="handleUpdatePages" :can-load-more="true">
      <template #item="{ item }">
        <div>
          <img :src="item.src" :alt="item.title" />
          {{ item.page}}
        </div>
      </template>
    </wyxos-masonry>
  </div>
</template>