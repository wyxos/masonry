<script setup>
import { ref, onMounted, nextTick, defineEmits, computed, onBeforeUnmount } from "vue";

const emit = defineEmits([
  "update:modelValue",
]);

const isLoading = ref(false);
const loadingDirection = ref("");
const props = defineProps({
  load: { type: Function, required: true },
  loadNext: { type: Function, required: true },
  loadPrevious: { type: Function, required: true },
  modelValue: { type: Array, required: true },
  canLoadMore: Boolean, // Flag indicating if more content can be loaded
  containerClass: { type: String, default: "infinite-scroll flex-1 flex flex-col overflow-x-hidden overflow-y-auto custom-scroll" }, // Customizable container class
  buttonClass: { type: String, default: "load-more-button" }, // Customizable button class
  loaderClass: { type: String, default: "text-center" }, // Customizable loader class
  gridItemClass: { type: String, default: "grid-item" }, // Customizable grid item class
  cacheSize: { type: Number, default: 5 }, // Number of pages to cache
  primaryKey: 'id',
});

const infiniteScroll = ref(null);
const loadMoreButton = ref(null);
const ready = ref(false);
let observer = null;

onMounted(async () => {
  emit("update:modelValue", []);

  ready.value = false;

  // Emit event to indicate initial content is ready
  const page = await props.load();

  console.log('page', page)

  if (page) {
    const updatedPages = [page];
    emit("update:modelValue", updatedPages);
  }

  ready.value = true;

  await nextTick();

  if (loadMoreButton.value) {
    observer = new IntersectionObserver(handleIntersection, {
      root: infiniteScroll.value,
      threshold: 0.8,
    });
    observer.observe(loadMoreButton.value);
  }
});

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect();
  }
});

const handleIntersection = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && props.canLoadMore && !isLoading.value) {
      loadNext();
    }
  });
};

const loadNext = async () => {
  let canLoadNext = ready && !isLoading.value && items.value.length > 0;
  if (!canLoadNext) return;

  isLoading.value = true;
  loadingDirection.value = "next";

  const page = await props.loadNext();

  if (page) {
    // Remove the oldest page if there are more than 5 pages
    if ([...props.modelValue, page].length > props.cacheSize) {
      // Remove the first page but do not append the new one yet
      const trimmedPages = props.modelValue.slice(1);
      emit("update:modelValue", trimmedPages); // Emit updated pages to parent
    }

    await nextTick();

    const updatedPages = [...props.modelValue, page];
    emit("update:modelValue", updatedPages);

    isLoading.value = false;
    loadingDirection.value = "";
  } else {
    isLoading.value = false;
    loadingDirection.value = "";
  }
};

const loadPrevious = async () => {
  if (isLoading.value) return;
  isLoading.value = true;
  loadingDirection.value = "previous";

  // Load previous items
  const page = await props.loadPrevious();
  if (page) {
    const updatedPages = [page, ...props.modelValue];
    emit("update:modelValue", updatedPages);

    await nextTick();

    // Remove the last page if there are more than 5 pages
    if (updatedPages.length > 5) {
      const trimmedPages = updatedPages.slice(0, -1); // Remove the last page
      emit("update:modelValue", trimmedPages); // Emit updated pages to parent
    }
  }

  isLoading.value = false;
  loadingDirection.value = "";
};

const items = computed(() => {
  return props.modelValue.reduce((acc, page) => {
    let items = page.items.map((item, pageIndex) => {
      item.page = page.page;
      item.pageIndex = pageIndex;

      return item;
    });

    return acc.concat(items);
  }, []);
});

const onRemove = (item) => {
  const pageIndex = item.pageIndex;
  const page = item.page;
  const updatedPages = props.modelValue.map((p) => {
    if (p.page === page) {
      p.items.splice(pageIndex, 1);
    }
    return p;
  });

  emit("update:modelValue", updatedPages);
};

</script>

<template>
  <div ref="infiniteScroll" :class="containerClass">
    <!-- Slot for loader before content, if needed -->
    <slot name="loader" v-if="isLoading && loadingDirection === 'previous'">
      <p :class="loaderClass">Loading previous content...</p>
    </slot>

    <transition-group class="grid grid-cols-6 gap-4 infinite-scroll-content relative" tag="div" name="w-masonry-list">
      <div v-for="(item, index) in items" :key="`${item[primaryKey]}`" :data-index="item.pageIndex" :class="gridItemClass">
        <!-- Slot for rendering the item -->
        <slot name="item" :item="item" :onRemove="onRemove">
          <img :src="item.src" :alt="item.title" />
          <button @click="onRemove(item)">Remove</button>
        </slot>
      </div>
    </transition-group>

    <!-- Slot for loader after content -->
    <slot name="loader" v-if="!ready">
      <p :class="loaderClass">Loading content...</p>
    </slot>

    <!-- Customizable load more button -->
    <slot name="load-more-button">
      <button ref="loadMoreButton" @click="loadNext" :disabled="isLoading" :class="buttonClass">
        {{ isLoading ? 'Loading next content...' : 'Load more' }}
      </button>
    </slot>
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

.load-more-button {
  margin: 1rem auto;
  padding: 0.5rem 1rem;
  background-color: #4a5568;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.load-more-button:disabled {
  background-color: #a0aec0;
  cursor: not-allowed;
}

.w-masonry-list-move,
.w-masonry-list-enter-active,
.w-masonry-list-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.w-masonry-list-enter-from,
.w-masonry-list-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

.w-masonry-list-leave-active {
  position: absolute;
}
</style>