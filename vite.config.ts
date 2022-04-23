import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import nodePolyfills from "rollup-plugin-polyfill-node";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      // string shorthand
      "/api": "http://localhost:8080",
    },
  },
  plugins: [
    react({
      babel: {
        plugins: ["babel-plugin-macros", "babel-plugin-styled-components"],
      },
    }),
    nodePolyfills({
      include: [
        "*.js",
        "node_modules/**/*.js",
        new RegExp("node_modules/.vite/.*js"),
      ],
    }),
  ],
});
