import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.join(__dirname, "src"),
      "@repo/core": path.join(__dirname, "..", "..", "packages", "core", "src"),
    },
  },
  test: {
    env: {
      TZ: "UTC",
    },
    environment: "jsdom",
    globals: true,
    setupFiles: [path.join(__dirname, "src", "tests", "setup")],
  },
});
