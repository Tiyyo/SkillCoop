/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import commonjs from '@rollup/plugin-commonjs';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
  test: {
    globals: true,
    environment: 'jsdom',
    css: true,
    setupFiles: './src/test/setup.ts',
  },
  server: {
    port: 5004,
    strictPort: true,
    host: true,
  },
  build: {
    // outDir: resolve(__dirname, 'dist'),
    outDir: './dist',
    rollupOptions: {
      plugins: [commonjs()],
    },
  },
});
