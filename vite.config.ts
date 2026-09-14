import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // host:true so the dev server is reachable through a Codespace's
  // forwarded port as well as on localhost.
  server: { port: 5180, host: true },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/__checks__/setup.ts'],
    include: ['src/__checks__/**/*.test.tsx'],
  },
});
