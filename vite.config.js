import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/bookstore/',
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
  }
})
