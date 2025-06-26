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
      "@": path.resolve(__dirname, "./src"),
      // "@/assets/images": path.resolve(__dirname, "public/images"),
      // "@icons": path.resolve(__dirname, "public/icons"),
      // "@components": path.resolve(__dirname, "assets/js/components"),
      // "@lib": path.resolve(__dirname, "assets/js/lib"),
      // "@functions": path.resolve(__dirname, "assets/js/functions"),
    },
  },
  server: {
    port: 5173,
    strictPort: true, // Empêche Vite de changer de port
    cors: true,
    host: '0.0.0.0', // IMPORTANT: Permet d'écouter sur toutes les interfaces
    watch: {
      usePolling: true,
    },
    hmr: {
      host: 'localhost',
    },
    open: false,
    https: false,
  },
  build: {
    outDir: './public/build', // Sortie des fichiers dans le dossier public de Symfony
    base: '/build/', // Cette ligne est importante pour servir à partir de la racine
    rollupOptions: {
      input: {
        app: "./src/app.jsx",
        styles: "./src/css/app.scss",
      },
    },
  },
});
