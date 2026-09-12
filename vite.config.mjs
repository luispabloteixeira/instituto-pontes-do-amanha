import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  appType: 'spa',
  base: './',
  input: {
    app: resolve(import.meta.dirname, 'html/index.html')
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    minify: 'oxc',
    cssMinify: 'lightningcss',
    sourcemap: false,
    reportCompressedSize: true
  }
});
