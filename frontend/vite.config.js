import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss() , react()],
  build: {
    // genera el archivo .vite/manifest.json en outDir
    manifest: true,
    rollupOptions: {
      // sobreescribe la entrada por defecto .html
      input: '/path/to/main.js',
    },
  },
  server: {
      // the origin you will be accessing via browser
      origin: 'http://localhost:5001/api',
      cors: true,
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3001', // Dirección del backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
)
