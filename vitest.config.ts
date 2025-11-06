import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    setupFiles: [
      './test/setupJestMocks.ts',
      './test/setupRnMocks.ts',
      './test/setup.ts',
    ],
    environment: 'jsdom',
  },
});
