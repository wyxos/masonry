# Documentation for `WyxosMasonry.vue`

**File Path**: `src\components\WyxosMasonry.vue`

# `WyxosMasonry.vue` Documentation

## File Purpose
`WyxosMasonry.vue` is a Vue.js component that provides an infinite scrolling masonry-style grid of items. It allows for dynamic loading of new items, removal of items, and customization of the grid's appearance.

## Key Functions/Classes

- **`loadNext`**: This asynchronous function loads the next set of items when the end of the current set is reached.
- **`loadPrevious`**: This asynchronous function loads the previous set of items when the start of the current set is reached.
- **`handleIntersection`**: This function is triggered when the 'Load More' button comes into view and calls `loadNext` to load more items if possible.
- **`onRemove`**: This function removes an item from the grid when the remove button is clicked.

## How It's Used
This file is used within the larger project as a Vue.js component. It should be imported into the parent component and utilized there. The parent component should provide the required `load`, `loadNext`, `loadPrevious`, and `modelValue` props, and can optionally customize the appearance and behavior of the grid with additional props.

## Dependencies
This file relies heavily on Vue.js 3's Composition API, including `ref`, `onMounted`, `nextTick`, `defineEmits`, `computed`, and `onBeforeUnmount`. It also uses the Intersection Observer API to detect when the 'Load More' button comes into view.