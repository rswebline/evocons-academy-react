import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: '127.0.0.1',
    port: 5173,
    strictPort: true,
    proxy: {
      '/api/academy/courses': {
        target: 'http://127.0.0.1:8055',
        changeOrigin: true,
        rewrite: path =>
          path.replace(
            /^\/api\/academy\/courses/,
            '/academy-catalog/courses'
          )
      }
    }
  }
});
