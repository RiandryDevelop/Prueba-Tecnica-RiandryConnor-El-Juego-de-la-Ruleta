import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { configDefaults } from 'vitest/config';


export default defineConfig({
  plugins: [vue()],
  test: {
    exclude: [...configDefaults.exclude, 'e2e/*'],
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./setupTests.ts'],

  }
})
