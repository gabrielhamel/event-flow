import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite-plus";

export default defineConfig({
  plugins: [
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
    }),
    react(),
  ],
  fmt: {
    ignorePatterns: ["./src/routeTree.gen.ts"],
  },
  lint: {
    ignorePatterns: ["./src/routeTree.gen.ts"],
  },
  test: {
    include: ["./src/**/*.test.{ts,tsx}"],
    passWithNoTests: true,
  },
});
