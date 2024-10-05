<script setup>
import {computed, onMounted, ref, watch} from "vue";

const props = defineProps({
  pages: Array,
  columnCount: {
    type: Number,
    default: 3
  },
  maxPages: {
    type: Number,
    default: 5
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
      Array.from({length: props.columnCount}, () => [])
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
    // Ensure the number of pages does not exceed maxPages
    if (props.pages.length > props.maxPages) {
      props.pages.shift();
    }
    isLoadingNext.value = false;
  }
};

const loadPrevious = async () => {
  if (typeof props.onLoadPrevious === 'function' && !isLoadingPrevious.value && props.pages[0]?.page !== 1) {
    isLoadingPrevious.value = true;
    await props.onLoadPrevious();
    isLoadingPrevious.value = false;
  }
};

const handleScroll = () => {
  if (!masonryRef.value) return;

  if (isLoadingNext.value || isLoadingPrevious.value) return;

  const {scrollTop, scrollHeight, clientHeight} = masonryRef.value;

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
      <button class="scroll-button" @click="loadPrevious" :disabled="isLoadingPrevious">Load Previous</button>
      <div class="flex-1 flex">
        <div v-for="(column, index) in columns" :key="index" class="flex-1">
          <figure v-for="(item, itemIndex) in column" :key="item.id">
            <img :src="item.src" :alt="item.alt" class="min-h-[100px]"/>
            <button @click="$emit('remove-item', item.id)" class="remove-button">Remove</button>
            {{ item.id }}
          </figure>
        </div>
      </div>
      <button class="scroll-button" @click="loadNext" :disabled="isLoadingNext">Load Next</button>
    </div>
  </div>
</template>
<style>
.scroll-button {
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

.remove-button {
  background-color: red;
  color: white;
  border: none;
  padding: 5px;
  cursor: pointer;
  margin-top: 5px;
}

.remove-button:hover {
  background-color: darkred;
}
</style>