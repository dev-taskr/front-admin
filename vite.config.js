import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
    },
  },
  build: {
    rollupOptions: {
      cache: false,
      // make sure to externalize Vue
      external: ['vue'],
      output: {
        // Provide global variables to use in the UMD build for externalized deps
        globals: {
          vue: 'Vue'
        },
        exports: "named",
      },
    },
  },
});
