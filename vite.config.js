import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Адаптация Webpack fallbacks под Vite
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      assert: 'assert',
      buffer: 'buffer',
      crypto: 'crypto-browserify',
      stream: 'stream-browserify',
      util: 'util',
      process: 'process/browser',
      http: 'stream-http',
      https: 'https-browserify',
      os: 'os-browserify/browser',
      zlib: 'browserify-zlib',
      url: 'url',
    },
  },
  define: {
    global: 'window',
    'process.env': {}, // предотвращает ошибки process.env.*
  },
  optimizeDeps: {
    include: ['buffer', 'process'],
  },
});
