
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      '/api/gtd': {
        target: 'https://ether-archive-gtd-api.e-gndz-33.workers.dev',
        changeOrigin: true,
        secure: true,
      },
    },
  },

  build: {
    minify: 'terser',
    sourcemap: false,
  },
})
