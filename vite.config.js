import { defineConfig } from 'vite';
import babel from '@rollup/plugin-babel';

export default defineConfig({
  plugins: [
    {
      enforce: 'pre',
      ...babel({
        babelHelpers: 'bundled',
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        exclude: 'node_modules/**',
        presets: [
          ['@babel/preset-react', { runtime: 'automatic' }],
        ],
      }),
    },
  ],
  build: {
    outDir: 'build',
  },
  optimizeDeps: {
    // Pre-bundle these at startup so the first load from any device never
    // triggers a mid-request re-optimization + reload. Babel uses the
    // automatic JSX runtime (`react/jsx-runtime`), which the esbuild dep
    // scanner does not detect on its own.
    include: [
      'react',
      'react-dom',
      'react-dom/client',
      'react/jsx-runtime',
      'react-router-dom',
      'gsap',
    ],
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
  server: {
    port: 3000,
    allowedHosts: [
      'mustard-monopoly-uncaring.ngrok-free.dev',
      '.ngrok-free.dev',
      'pe9pc3-ip-187-250-112-5.tunnelmole.net',
      '.tunnelmole.net',
    ],
  },
});
