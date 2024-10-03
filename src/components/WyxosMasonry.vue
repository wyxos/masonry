<script setup>
import {computed, onMounted, ref, watch} from "vue";

const props = defineProps({
  pages: Array,
  columnCount: {
    type: Number,
    default: 3
  },
  onLoadNext: Function,
  onLoadPrevious: Function
})

const items = computed(() => {
  return props.pages.reduce((acc, page) => {
    return acc.concat(page.items)
  }, [])
})

const columns = computed(() => {
  return items.value.reduce(
      (acc, item, index) => {
        acc[index % props.columnCount].push(item)
        return acc
      },
      Array.from({ length: props.columnCount }, () => [])
  )
})

const masonryRef = ref(null);
const atBottom = ref(false);
const atTop = ref(true);
const isLoadingNext = ref(false);
const isLoadingPrevious = ref(false);

const loadNext = async () => {
  if (typeof props.onLoadNext === 'function' && !isLoadingNext.value) {
    isLoadingNext.value = true;
    await props.onLoadNext();
    isLoadingNext.value = false;
  }
};

const loadPrevious = async () => {
  if (typeof props.onLoadPrevious === 'function' && !isLoadingPrevious.value) {
    isLoadingPrevious.value = true;
    await props.onLoadPrevious();
    isLoadingPrevious.value = false;
  }
};

const handleScroll = () => {
  if (!masonryRef.value) return;

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
  <div class="masonry-container">
    <button class="scroll-button" @click="loadPrevious" :disabled="isLoadingPrevious">Load Previous</button>
    <div ref="masonryRef" class="masonry">
      <div v-for="(column, index) in columns" :key="index" class="column">
        <div v-for="(item, index) in column" :key="index">
          <img :src="item.src" :alt="item.alt" />
        </div>
      </div>
    </div>
    <button class="scroll-button" @click="loadNext" :disabled="isLoadingNext">Load Next</button>
  </div>
</template>
<style>
.masonry-container {
  overflow: hidden;
  position: relative;
  height: 100vh; /* Set desired height */
}

.masonry {
  overflow: auto;
  height: calc(100% - 80px); /* Adjust for button height if needed */
  display: flex;
  gap: 16px; /* Adjust gap between columns */
}

.column {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px; /* Adjust gap between items in each column */
}

.scroll-button {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  background-color: #007BFF;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.scroll-button:hover {
  background-color: #0056b3;
}

.scroll-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.scroll-button:first-of-type {
  top: 10px;
}

.scroll-button:last-of-type {
  bottom: 10px;
}
</style>