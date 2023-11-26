import { defineConfig } from 'vite'

export default defineConfig({
  root: "./src/docs",
  build: {
    outDir: "../../docs",
    emptyOutDir: true,
    rollupOptions: {
      treeshake: true,
    }
  }
})