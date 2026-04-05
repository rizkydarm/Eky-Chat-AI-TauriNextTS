import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@eky/ui": path.resolve(__dirname, "../../packages/ui/src"),
      "@eky/types": path.resolve(__dirname, "../../packages/types/src"),
      "@eky/utils": path.resolve(__dirname, "../../packages/utils/src"),
      "@eky/db": path.resolve(__dirname, "../../packages/db/src"),
    },
  },
  server: {
    port: 1420,
    strictPort: true,
  },
});
