import { defineConfig } from "vite-plus";

export default defineConfig({
  pack: {
    entry: ["src/index.ts"],
    target: "es2023",
    deps: {
      alwaysBundle: [/.*/u],
    },
  },
});
