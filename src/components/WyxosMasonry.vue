<script setup>
import {computed} from "vue";

const props = defineProps({
  pages: Array,
  columnCount: {
    type: Number,
    default: 3
  }
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
</script>
<template>
  <div class="masonry">
    <div v-for="(column, index) in columns" :key="index" class="column">
      <div v-for="(item, index) in column" :key="index">
        <img :src="item.src" :alt="item.alt" />
      </div>
    </div>
  </div>
</template>
<style>
.masonry {
  display: flex;
  gap: 16px; /* Adjust gap between columns */
}

.column {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px; /* Adjust gap between items in each column */
}
</style>