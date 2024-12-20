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
      "/posts": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
      },
      "/followme": {
        target: "http://localhost:5000", // Backend server
        changeOrigin: true, // Menja origin ako je potrebno
        secure: false, // Ako vaš backend koristi HTTPS, postavite na true
      },
      // Preusmerava zahteve sa '/following' na vaš backend
      "/following": {
        target: "http://localhost:5000", // Backend server
        changeOrigin: true, // Menja origin ako je potrebno
        secure: false, // Ako vaš backend koristi HTTPS, postavite na true
      },
    },
  },
});
