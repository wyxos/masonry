<template>
  <div ref="infiniteScroll" class="infinite-scroll flex-1 flex flex-col overflow-auto custom-scroll"
       @scroll="throttledOnScroll">
    <p v-if="isLoading && loadingDirection === 'previous'" class="text-center">Loading previous content...</p>
    <div class="grid grid-cols-6 flex-1">
      <div v-for="item in items" :key="item.key">
        <slot name="item" :item="item">
          <img :src="item.src" :alt="item.title"/>
        </slot>
      </div>
    </div>
    <p v-if="isLoading && loadingDirection === 'next'" class="text-center">Loading more content...</p>
  </div>
</template>

<script setup>
import {ref, watch, onMounted, nextTick} from "vue";
import throttle from "lodash/throttle";

const isLoading = ref(false);
const loadingDirection = ref('');

const props = defineProps({
  onInitialContentReady: Function,
  loadNext: Function,
  loadPrevious: Function,
  items: Array,
});

const infiniteScroll = ref(null);

onMounted(() => {
  // Emit event to indicate initial content is ready
  props.onInitialContentReady?.();
});

let currentScrollHeight = 0;

const throttledOnScroll = throttle(() => {
  if (!isLoading.value) {
    onScroll();
  }
}, 200);

const onScroll = () => {
  if (infiniteScroll.value) {
    const {scrollTop, scrollHeight, clientHeight} = infiniteScroll.value;
    if (scrollTop + clientHeight >= scrollHeight - 10 && !isLoading.value) {
      loadingDirection.value = 'next';
      isLoading.value = true;
      props.loadNext().finally(() => {
        isLoading.value = false;
      });
    } else if (scrollTop <= 10 && !isLoading.value) {
      loadingDirection.value = 'previous';
      isLoading.value = true;
      const prevScrollTop = infiniteScroll.value.scrollTop;
      currentScrollHeight = infiniteScroll.value.scrollHeight;
      props.loadPrevious().finally(async () => {
        await nextTick();
        // Adjust scroll position to maintain user's scroll point when loading previous content
        if (infiniteScroll.value) {
          const newScrollHeight = infiniteScroll.value.scrollHeight;
          infiniteScroll.value.scrollTop = prevScrollTop + (newScrollHeight - currentScrollHeight);
        }
        isLoading.value = false;
      });
    }
  }
};
</script>

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