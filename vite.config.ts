import { sveltekit } from '@sveltejs/kit/vite'
import legacy from '@vitejs/plugin-legacy'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
import topLevelAwait from 'vite-plugin-top-level-await'

export default defineConfig({
  plugins: [
    UnoCSS(),
    topLevelAwait(),
    sveltekit(),
    // @ts-ignore
    legacy({
      targets: ['defaults', 'safari >= 13'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
    }),
  ],
  server: {
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
