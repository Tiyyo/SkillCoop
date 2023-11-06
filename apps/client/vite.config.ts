import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5004,
    strictPort: true,
    host: true
  },
  build: {
    // outDir: resolve(__dirname, 'dist'),
    outDir: "./dist",
    rollupOptions: {

    }
  }
})
