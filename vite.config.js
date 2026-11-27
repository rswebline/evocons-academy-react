import { defineConfig } from 'vite';

const directusTarget = 'http://127.0.0.1:8055';

export default defineConfig({
  server: {
    host: '127.0.0.1',
    port: 5173,
    strictPort: true,
    cors: false,

    proxy: {
      '/api/academy/courses': {
        target: directusTarget,
        changeOrigin: true,
        rewrite: path =>
          path.replace(
            /^\/api\/academy\/courses/,
            '/academy-catalog/courses'
          )
      },

      '^/api/academy/orientation/(quiz|next|result)$': {
        target: directusTarget,
        changeOrigin: true,

        rewrite: path =>
          path.replace(
            /^\/api\/academy\/orientation/,
            '/academy-orientation'
          ),

        configure: proxy => {
          proxy.on('proxyReq', proxyReq => {
            const token = process.env.DIRECTUS_TOKEN;

            proxyReq.removeHeader('Authorization');

            if (token) {
              proxyReq.setHeader(
                'Authorization',
                `Bearer ${token}`
              );
            }
          });
        }
      }
    }
  }
});