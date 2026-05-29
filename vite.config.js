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
