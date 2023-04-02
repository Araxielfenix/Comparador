import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solidPlugin()],
  base: 'https://araxielfenix.github.io/Comparador-Solid/#',
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
});
