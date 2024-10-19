# Documentation for `WyxosMasonry.vue`

**File Path**: `src\components\WyxosMasonry.vue`

**WyxosMasonry.vue**
=====================

**File Purpose**
---------------

The `WyxosMasonry.vue` file is a custom Vue component designed to handle infinite scrolling for a masonry layout. It provides a flexible and customizable solution for loading and rendering content in an endless scroll manner.

**Key Functions/Classes**
------------------------

*   `emit`: Emits events to update the parent component's model value.
*   `isLoading`, `loadingDirection`: Refs used to track the loading state and direction of the component.
*   `props`: Defines the component's props, including functions for loading more content (`loadNext` and `loadPrevious`) and customizable classes for the container, load more button, loader, grid item, and cache size.
*   `infiniteScroll`, `loadMoreButton`, `ready`: Refs used to store references to the infinite scroll container, load more button, and ready state flag.

**How It's Used**
----------------

The component is typically used in conjunction with a parent component that provides the necessary props (e.g., `loadNext` and `loadPrevious`) functions. The child component will handle the rendering of content and the infinite scrolling functionality, updating its model value as needed to reflect changes in the data.

**Dependencies**
---------------

*   `vue`
*   `IntersectionObserver`

**Example Usage**
-----------------

```html
<WyxosMasonry
  :containerClass="customContainerClass"
  :loadMoreButtonClass="customLoadMoreButtonClass"
  :loaderClass="customLoaderClass"
  :gridItemClass="customGridItemClass"
  :cacheSize="10"
  @update:modelValue="handleModelUpdate"
/>
```

```html
<template>
  <div class="my-component">
    <!-- Slot for rendering the component's content -->
    <slot />
  </div>
</template>

<script>
import WyxosMasonry from './WyxosMasonry.vue'

export default {
  components: { WyxosMasonry },
  methods: {
    handleModelUpdate(value) {
      // Update your parent component's model value here
    }
  }
}
</script>
```