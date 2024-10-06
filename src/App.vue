<script setup>
import {computed, onMounted, ref} from 'vue';
import { v4 as uuidv4 } from 'uuid';

const pages = ref([]);
const isLoading = ref(false);
const hasError = ref(false);

const loadPage = async () => {
  isLoading.value = pages.value.length === 0;
  hasError.value = false;
  try {
    // Fetch the next page
    const response = await new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.8) { // Simulate a potential failure
          reject(new Error('Failed to load data'));
        } else {
          resolve({
            data: {
              items: Array.from({ length: 10 }, (_, index) => {
                const randomWidth = Math.floor(Math.random() * 200) + 100; // Random width between 100 and 300
                const randomHeight = Math.floor(Math.random() * 200) + 100; // Random height between 100 and 300
                return {
                  id: uuidv4(),
                  src: `https://picsum.photos/${randomWidth}/${randomHeight}?random=${index}`,
                };
              }),
            },
          });
        }
      }, 1000);
    });

    // Append the new page to the existing pages
    pages.value = [...pages.value, {
      page: uuidv4(),
      items: response.data.items,
    }];
  } catch (error) {
    console.error(error);
    alert('Failed to load data. Please try again.');
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  loadPage();
});

const columnCount = 4;


const masonry = computed(() => {
  // distribute in 4 columns
  const columns = Array.from({ length: columnCount }, () => []);
  pages.value.forEach((page) => {
    page.items.forEach((item, index) => {
      columns[index % 4].push(item);
    });
  });

  return columns;

});
</script>

<template>
  <div v-if="isLoading && pages.length === 0">
    Loading...
  </div>

  <div v-else>
    <div class="flex">
      <div v-for="(column, index) in masonry" :key="index" class="column">
        <div v-for="item in column" :key="item.id" class="item">
          <img :src="item.src" alt="Masonry item" />
        </div>
      </div>
    </div>
    <button v-if="!isLoading" @click="loadPage">Load More</button>
  </div>
</template>