import { defineConfig } from "vite";
import symfonyPlugin from "vite-plugin-symfony";
import path from "path";

/* if you're using React */
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    /* react(), // if you're using React */
    react(),
    symfonyPlugin(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "assets/js"),
      "@images": path.resolve(__dirname, "public/images"),
      "@icons": path.resolve(__dirname, "public/icons"),
      "@components": path.resolve(__dirname, "assets/js/components"),
      "@functions": path.resolve(__dirname, "assets/js/functions"),
    },
  },
  server: {
    hmr: false,
  },
  build: {
    outDir: "public/build",
    rollupOptions: {
      input: {
        app: "./assets/app.jsx",
        styles: "assets/styles/app.scss",
      },
    },
  },
});
