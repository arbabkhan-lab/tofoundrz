import { defineConfig } from 'vite'

// Clean Vite config (no Base44, no errors)
export default defineConfig({
  root: '.',

  build: {
    outDir: 'dist',
    emptyOutDir: true
  },

  server: {
    port: 5173,
    open: true
  }
})
