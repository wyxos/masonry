import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/components/WyxosMasonry.vue'), // Entry point for the library
      name: 'WyxosMasonry', // Global variable name for UMD builds
      fileName: (format) => `wyxos-masonry.${format}.js` // Output file naming
    },
    rollupOptions: {
      // External dependencies to exclude from the bundle
      external: ['vue'],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
});
