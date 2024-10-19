# Project Overview

## Project Purpose

This project is a Vue.js application that implements an infinite scrolling masonry-style grid. The grid allows for dynamic loading of items, both forward and backward, and supports removal of items. The main purpose of this project is to provide a user-friendly interface for browsing a large number of items in a compact, visually pleasing layout.

## Key Features

- **Infinite Scrolling**: The application supports infinite scrolling, allowing users to browse through a large number of items without having to click on pagination buttons. The scrolling can be both ways - forward and backward.
- **Masonry Layout**: The items are displayed in a masonry-style grid, which is a popular layout style for image galleries and portfolios. It places elements in optimal position based on available vertical space, sort of like a mason fitting stones in a wall.
- **Dynamic Loading**: The application dynamically loads items as the user scrolls, providing a seamless browsing experience. It uses the Intersection Observer API to detect when the user has scrolled near the end of the current set of items, and then loads the next set.
- **Item Removal**: Users can remove items from the grid. This functionality is implemented in the `WyxosMasonry.vue` component.

## Summary

The project consists of three main files:

- `App.vue`: This is the main component file that loads and manages a list of items in a masonry layout using the `WyxosMasonry` component. It provides functionality to load initial items, load next and previous pages of items, and add new items at random positions.
- `main.js`: This is the entry point of the Vue.js application. It's responsible for creating and mounting the main Vue instance (App) to the HTML.
- `WyxosMasonry.vue`: This is a Vue.js component that provides an infinite scrolling masonry-style grid of items. It allows for dynamic loading of new items, removal of items, and customization of the grid's appearance.

The `App.vue` component is the entry point of the application and it renders the `WyxosMasonry` component. The `WyxosMasonry` component is responsible for the masonry layout and infinite scrolling functionality. The `main.js` file initializes the Vue application and mounts it to the DOM.