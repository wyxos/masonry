<script setup>
import WyxosMasonry from "./components/WyxosMasonry.vue";
import { v4 as uuid } from "uuid";
import { computed, onMounted, ref } from "vue";

const pages = ref([]);

const loadNext = async () => {
  // If no pages are loaded, start from page 1
  const currentPage = pages.value.length ? pages.value[pages.value.length - 1].page : 1;
  const nextPage = currentPage + 1;

  const page = {
    page: nextPage,
    items: Array.from({ length: 48 }, (_, index) => ({
      id: index,
      key: uuid(),
      title: `Item ${(nextPage - 1) * 48 + index + 1}`,
      src: `https://picsum.photos/200/200?random=${uuid()}`,
    })),
  };

  // Simulate a delay to show loading state
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return page;
};

const loadPrevious = async () => {
  // If already at the first page, do not load previous
  if (pages.value.length && pages.value[0].page <= 1) return;

  const previousPage = pages.value[0].page - 1;

  const page = {
    page: previousPage,
    items: Array.from({ length: 48 }, (_, index) => ({
      id: index,
      key: uuid(),
      title: `Item ${(previousPage - 1) * 48 + index + 1}`,
      src: `https://picsum.photos/200/200?random=${uuid()}`,
    })),
  };

  // Simulate a delay to show loading state
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return page;
};

const load = async () => {
  const page = {
    page: 1,
    items: Array.from({ length: 48 }, (_, index) => ({
      id: index,
      key: uuid(),
      title: `Item ${index + 1}`,
      src: `https://picsum.photos/200/200?random=${uuid()}`,
    })),
  };

  // Simulate a delay to show loading state
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return page;
};

const handleUpdatePages = (updatedPages) => {
  pages.value = updatedPages;
};

const onAdd = () => {
  if (!pages.value.length) return; // Avoid adding items if no pages are loaded

  // Select a random page from the loaded pages
  const randomPageIndex = Math.floor(Math.random() * pages.value.length);
  const selectedPage = pages.value[randomPageIndex];

  // Insert a new item at a random position within the selected page
  const randomPosition = Math.floor(Math.random() * selectedPage.items.length);
  selectedPage.items.splice(randomPosition, 0, {
    id: selectedPage.items.length,
    key: uuid(),
    title: `Item ${selectedPage.items.length + 1}`,
    src: `https://picsum.photos/200/200?random=${uuid()}`,
  });
};
</script>
<template>
  <div class="h-screen flex flex-col p-4 overflow-hidden">
    <div class="header flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">WyxosMasonry Demo</h1>
      <div class="controls flex space-x-4">
        <button @click="onAdd" class="btn btn-primary">Add Random Item</button>
      </div>
    </div>

    <div class="content flex flex-col flex-1 overflow-hidden">
      <wyxos-masonry
          :load="load"
          :load-next="loadNext"
          :load-previous="loadPrevious"
          :pages="pages"
          @updatePages="handleUpdatePages"
          :can-load-more="true"
          class="w-full pr-4"
      >
        <template #item="{ item, onRemove }">
          <div class="item-card p-2 bg-white rounded shadow-sm">
            <img :src="item.src" :alt="item.title" class="w-full h-32 object-cover rounded" />
            <div class="item-info mt-2 text-center">
              <button @click="onRemove(item)" class="btn btn-danger mt-2 rounded px-2 py-1">Remove</button>
            </div>
          </div>
        </template>
      </wyxos-masonry>
    </div>
  </div>
</template>
<style scoped>
.header {
  background-color: #fff;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.controls .btn {
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
}

.btn-primary {
  background-color: #4a90e2;
  color: #fff;
}

.btn-primary:hover {
  background-color: #357ab8;
}

.btn-danger {
  background-color: #e53e3e;
  color: #fff;
}

.btn-danger:hover {
  background-color: #c53030;
}

.item-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #e2e8f0;
  transition: transform 0.2s;
}

.item-card:hover {
  transform: translateY(-3px);
}
</style>
