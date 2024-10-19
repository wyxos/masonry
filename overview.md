**Project Overview**
=====================

The project is a Vue.js application that utilizes the `WyxosMasonry` component to display items with random positioning in an infinite scrolling manner. The application provides features for adding new items, loading more items, and removing existing items.

### Project Purpose

The primary purpose of this project is to demonstrate a functional and interactive masonry layout component using Vue.js. The `WyxosMasonry` component serves as the core logic and UI for the app, handling infinite scrolling and content rendering.

### Key Features

*   **Infinite Scrolling**: The application utilizes the `WyxosMasonry` component to load more content when the user reaches the end of a page.
*   **Random Item Positioning**: Each item in the masonry layout has a random position, providing a visually appealing and dynamic display.
*   **Adding New Items**: The application allows users to add new items to the masonry layout using the `onAdd` function.
*   **Loading More Content**: Users can load more content by clicking buttons or reaching the end of a page.

### Summary

The project consists of three main components:

1.  `App.vue`: The main application component that sets up the Vue instance and mounts it to the DOM.
2.  `main.js`: The entry point for the Vue application, which creates a new instance of the app and sets up its basic structure.
3.  `WyxosMasonry.vue`: A custom Vue component designed to handle infinite scrolling and content rendering for the masonry layout.

These components work together to provide an interactive and dynamic user interface, showcasing the capabilities of the `WyxosMasonry` component.