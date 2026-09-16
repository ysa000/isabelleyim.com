import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Builds the site once (flag off → dist/, flag on → dist-travel/) before any test runs.
    globalSetup: ['tests/global-setup.ts'],
    include: ['tests/**/*.test.ts'],
    testTimeout: 30_000,
  },
});
