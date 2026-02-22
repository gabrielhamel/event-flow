import * as path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@repo/core": path.join(__dirname, "src"),
    },
  },
  test: {
    globals: true,
  },
});
