import { serve } from 'bun';
import index from './index.html';

const server = serve({
  routes: {
    '/mockServiceWorker.js': {
      GET() {
        const path = import.meta.dir + '/mockServiceWorker.js';
        const file = Bun.file(path);
        return new Response(file);
      },
    },

    // Serve index.html for all unmatched routes.
    '/*': index,
  },

  development: process.env.NODE_ENV !== 'production' && {
    // Enable browser hot reloading in development
    hmr: true,

    // Echo console logs from the browser to the server
    console: true,
  },
});

console.log(`🚀 Server running at ${server.url}`);
