import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  build: {
    sourcemap: true,
  },
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/allusers": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
      },
      "/posts": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
      },
      "/followme": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
      },

      "/following": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
