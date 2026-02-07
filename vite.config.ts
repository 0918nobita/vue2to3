import path from 'node:path';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import { analyzer } from 'vite-bundle-analyzer';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

export default defineConfig({
  plugins: [
    vue(),
    cssInjectedByJsPlugin({
      jsAssetsFilterFunction: (outputChunk) => outputChunk.isEntry,
    }),
    ...(process.env.VITE_ANALYZE === 'true' ? [analyzer()] : []),
  ],
  build: {
    outDir: 'www/js',
    sourcemap: 'hidden',
    lib: {
      formats: ['es'],
      entry: 'src/main.ts',
      fileName: () => 'main.js',
    },
  },
  resolve: {
    alias: {
      '~': path.resolve(import.meta.dirname, './src'),
      vue: '@vue/compat',
    },
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  },
});
