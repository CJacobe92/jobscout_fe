import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import mkcert from 'vite-plugin-mkcert'

export default defineConfig({
  plugins: [react(), mkcert()],
  resolve: {
    alias: {
      '/src': '/src', // You can add this alias if needed
      '@components': '/src/components',
      '@pages': '/src/pages',
      '@assets': '/src/assets',
      '@services': '/src/services',
      '@context': '/src/context',
      '@utils': '/src/utils',
      '@hooks': '/src/hooks'
    },
  },
    server: {
    https: true, // Enable HTTPS
  },
})
