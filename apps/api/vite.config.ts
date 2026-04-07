import { defineConfig } from "vite-plus";

export default defineConfig({
  pack: {
    entry: ["src/index.ts"],
    target: "es2023",
    tsconfig: "tsconfig.app.json",
    deps: {
      alwaysBundle: [/.*/u],
    },
  },
  test: {
    include: ["./src/**/*.test.ts"],
    passWithNoTests: true,
  },
});
