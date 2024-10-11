<script setup>
import {ref, onMounted, nextTick} from "vue";
import throttle from "lodash/throttle";

const isLoading = ref(false);
const loadingDirection = ref("");

const props = defineProps({
  load: Function,
  loadNext: Function,
  loadPrevious: Function,
  items: Array,
});

const infiniteScroll = ref(null);
const ready = ref(false);

onMounted(async () => {
  // Emit event to indicate initial content is ready
  await props.load?.();

  ready.value = true;

  if (infiniteScroll.value) {
    infiniteScroll.value.addEventListener("scroll", throttledOnScroll);
  }
});

const throttledOnScroll = throttle(() => {
  if (!isLoading.value) {
    onScroll();
  }
}, 50); // Reduced from 100ms

const onScroll = () => {
  if (isLoading.value) {
    return;
  }

  if (infiniteScroll.value) {
    const {scrollTop, scrollHeight, clientHeight} = infiniteScroll.value;

    // Check for scroll to top first to prioritize loading previous content
    if (scrollTop <= 150) { // Increased threshold for more reliable triggering
      loadPrevious();
    }
    // Check for scroll to bottom to load more content
    else if (scrollTop + clientHeight >= scrollHeight - 100) {
      loadNext();
    }
  }
};

const loadNext = async () => {
  if (isLoading.value) return;
  isLoading.value = true;
  loadingDirection.value = "next";

  await props.loadNext?.();
  isLoading.value = false;
  loadingDirection.value = "";
};

const loadPrevious = async () => {
  if (isLoading.value) return;
  isLoading.value = true;
  loadingDirection.value = "previous";

  // Load previous items
  await props.loadPrevious?.();
  await nextTick(); // Wait for the DOM to be updated after new items are loaded

  isLoading.value = false;
  loadingDirection.value = "";
};
</script>

<template>
  <div ref="infiniteScroll" class="infinite-scroll flex-1 flex flex-col overflow-auto custom-scroll"
       @scroll="throttledOnScroll">
    <p v-if="isLoading && loadingDirection === 'previous'" class="text-center">Loading previous content...</p>
    <div class="grid grid-cols-6 flex-1" v-if="ready">
      <div v-for="item in props.items" :key="item.key" :data-key="item.key">
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
