<script setup>
import { onMounted, ref } from "vue";

const items = ref([]);
const columnCount = 4; // Number of columns for masonry layout
const columnHeights = ref(Array.from({ length: columnCount }, () => 0)); // Track the height of each column

onMounted(() => {
  items.value = Array.from({ length: 50 }, (_, index) => {
    const width = Math.floor(Math.random() * 200) + 100; // Random width between 100 and 300
    const height = Math.floor(Math.random() * 200) + 100; // Random height between 100 and 300

    // Find the shortest column to place the item
    const column = columnHeights.value.indexOf(Math.min(...columnHeights.value));
    const top = columnHeights.value[column];
    columnHeights.value[column] += height + 16; // Update column height (including margin)

    return {
      id: index,
      title: `Item ${index + 1}`,
      width,
      height,
      column,
      top
    };
  });
});
</script>

<template>
  <div class="relative w-full">
    <div
        v-for="item in items"
        :key="item.id"
        class="absolute"
        :style="{
        width: `${item.width}px`,
        height: `${item.height}px`,
        left: `${item.column * 25}%`,
        top: `${item.top}px`
      }"
    >
      <div class="w-full h-full bg-red-500 m-2">
        {{ item.title }}
        <p>{{ item.width }} x {{ item.height }}</p>
      </div>
    </div>
  </div>
</template>