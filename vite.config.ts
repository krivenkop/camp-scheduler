import { sveltekit } from '@sveltejs/kit/vite'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    UnoCSS(),
    sveltekit(),
  ],
  server: {
    host: '0.0.0.0',
    cors: {
      origin: 'https://time.tc.io',
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
