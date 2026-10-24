import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config.js';

// Vitest is scoped to the merchandising component test only. The Jest suites in
// src/**/*.test.{js,jsx} keep their own runner and are not part of this config.
export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      globals: true,
      include: ['src/components/ProductosPromo.test.jsx'],
      css: false,
    },
  }),
);
