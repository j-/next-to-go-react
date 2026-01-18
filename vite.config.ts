import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  define: {
    'process.env': {
      BUN_PUBLIC_API_HOST: process.env.BUN_PUBLIC_API_HOST,
      BUN_PUBLIC_ENABLE_MOCKS: process.env.BUN_PUBLIC_ENABLE_MOCKS,
    } as Bun.Env,
  },
  plugins: [react()],
});
