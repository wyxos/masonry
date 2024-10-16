// vite.config.js
import { defineConfig } from "file:///D:/code/wyxos/js/masonry/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/code/wyxos/js/masonry/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { resolve } from "path";
var __vite_injected_original_dirname = "D:\\code\\wyxos\\js\\masonry";
var vite_config_default = defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__vite_injected_original_dirname, "src/components/WyxosMasonry.vue"),
      name: "WyxosMasonry",
      formats: ["es", "umd"],
      fileName: (format) => {
        if (format === "es") return "wyxos-masonry.esm.js";
        if (format === "umd") return "wyxos-masonry.umd.js";
        return `wyxos-masonry.${format}.js`;
      }
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        exports: "named",
        globals: {
          vue: "Vue"
        },
        // CSS name configuration
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === "style.css") return "wyxos-masonry.css";
          return assetInfo.name;
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxjb2RlXFxcXHd5eG9zXFxcXGpzXFxcXG1hc29ucnlcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXGNvZGVcXFxcd3l4b3NcXFxcanNcXFxcbWFzb25yeVxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovY29kZS93eXhvcy9qcy9tYXNvbnJ5L3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdwYXRoJztcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW3Z1ZSgpXSxcbiAgYnVpbGQ6IHtcbiAgICBsaWI6IHtcbiAgICAgIGVudHJ5OiByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9jb21wb25lbnRzL1d5eG9zTWFzb25yeS52dWUnKSxcbiAgICAgIG5hbWU6ICdXeXhvc01hc29ucnknLFxuICAgICAgZm9ybWF0czogWydlcycsICd1bWQnXSxcbiAgICAgIGZpbGVOYW1lOiAoZm9ybWF0KSA9PiB7XG4gICAgICAgIGlmIChmb3JtYXQgPT09ICdlcycpIHJldHVybiAnd3l4b3MtbWFzb25yeS5lc20uanMnO1xuICAgICAgICBpZiAoZm9ybWF0ID09PSAndW1kJykgcmV0dXJuICd3eXhvcy1tYXNvbnJ5LnVtZC5qcyc7XG4gICAgICAgIHJldHVybiBgd3l4b3MtbWFzb25yeS4ke2Zvcm1hdH0uanNgO1xuICAgICAgfSxcbiAgICB9LFxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIGV4dGVybmFsOiBbJ3Z1ZSddLFxuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIGV4cG9ydHM6ICduYW1lZCcsXG4gICAgICAgIGdsb2JhbHM6IHtcbiAgICAgICAgICB2dWU6ICdWdWUnXG4gICAgICAgIH0sXG4gICAgICAgIC8vIENTUyBuYW1lIGNvbmZpZ3VyYXRpb25cbiAgICAgICAgYXNzZXRGaWxlTmFtZXM6IChhc3NldEluZm8pID0+IHtcbiAgICAgICAgICBpZiAoYXNzZXRJbmZvLm5hbWUgPT09ICdzdHlsZS5jc3MnKSByZXR1cm4gJ3d5eG9zLW1hc29ucnkuY3NzJztcbiAgICAgICAgICByZXR1cm4gYXNzZXRJbmZvLm5hbWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFvUSxTQUFTLG9CQUFvQjtBQUNqUyxPQUFPLFNBQVM7QUFFaEIsU0FBUyxlQUFlO0FBSHhCLElBQU0sbUNBQW1DO0FBS3pDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxJQUFJLENBQUM7QUFBQSxFQUNmLE9BQU87QUFBQSxJQUNMLEtBQUs7QUFBQSxNQUNILE9BQU8sUUFBUSxrQ0FBVyxpQ0FBaUM7QUFBQSxNQUMzRCxNQUFNO0FBQUEsTUFDTixTQUFTLENBQUMsTUFBTSxLQUFLO0FBQUEsTUFDckIsVUFBVSxDQUFDLFdBQVc7QUFDcEIsWUFBSSxXQUFXLEtBQU0sUUFBTztBQUM1QixZQUFJLFdBQVcsTUFBTyxRQUFPO0FBQzdCLGVBQU8saUJBQWlCLE1BQU07QUFBQSxNQUNoQztBQUFBLElBQ0Y7QUFBQSxJQUNBLGVBQWU7QUFBQSxNQUNiLFVBQVUsQ0FBQyxLQUFLO0FBQUEsTUFDaEIsUUFBUTtBQUFBLFFBQ04sU0FBUztBQUFBLFFBQ1QsU0FBUztBQUFBLFVBQ1AsS0FBSztBQUFBLFFBQ1A7QUFBQTtBQUFBLFFBRUEsZ0JBQWdCLENBQUMsY0FBYztBQUM3QixjQUFJLFVBQVUsU0FBUyxZQUFhLFFBQU87QUFDM0MsaUJBQU8sVUFBVTtBQUFBLFFBQ25CO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
