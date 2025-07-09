import { sveltekit } from '@sveltejs/kit/vite'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    UnoCSS(),
    sveltekit(),
  ],
  server: {
    origin: 'http://time.tc.io',
    host: '0.0.0.0',
    cors: {
      origin: true,
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    },
  },
  build: {
    target: ['es2017', 'edge88', 'firefox78', 'chrome87', 'safari13'],
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2017',
    },
  },
})
