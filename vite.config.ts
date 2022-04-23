import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import nodePolyfills from "rollup-plugin-polyfill-node";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      include: [
        "*.js",
        "node_modules/**/*.js",
        new RegExp("node_modules/.vite/.*js"),
      ],
    }),
  ],
});
