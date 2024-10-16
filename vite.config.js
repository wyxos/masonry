import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import { resolve } from 'path';

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/components/WyxosMasonry.vue'),
      name: 'WyxosMasonry',
      formats: ['es', 'umd'],
      fileName: (format) => {
        if (format === 'es') return 'wyxos-masonry.esm.js';
        if (format === 'umd') return 'wyxos-masonry.umd.js';
        return `wyxos-masonry.${format}.js`;
      },
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue'
        },
        // CSS name configuration
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'wyxos-masonry.css';
          return assetInfo.name;
        }
      }
    }
  }
});
