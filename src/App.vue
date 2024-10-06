<script setup>
import { onMounted, ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';


const pages = ref([]);
const isLoading = ref(true);
const hasError = ref(false);

const loadPage = async () => {
  isLoading.value = true;
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
    pages.value.push({
      cursor: uuidv4(),
      items: response.data.items,
    });
  } catch (error) {
    console.error(error);
    hasError.value = true;
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  loadPage();
});
</script>

<template>
  <div v-if="isLoading">
    Loading...
  </div>
  <div v-else-if="hasError">
    <p>Error loading data. Please try again.</p>
    <button @click="loadPage">Retry</button>
  </div>
  <div v-else>
    <ul>
      <li v-for="page in pages" :key="page.cursor">
        <ul>
          <li v-for="item in page.items" :key="item.id">
            <img :src="item.src" alt="Random Image" />
          </li>
        </ul>
      </li>
    </ul>
    <button @click="loadPage">Load More</button>
  </div>
</template>