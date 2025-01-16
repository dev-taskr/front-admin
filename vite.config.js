import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'vue': './node_modules/vue/dist/vue.esm-bundler.js'
    }
  },
  build: {
    sourcemap: true,
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      external: [],
      output: {
        manualChunks: undefined
      }
    }
  }
})
