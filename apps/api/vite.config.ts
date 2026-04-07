import { defineConfig } from "vite-plus";

export default defineConfig({
  pack: {
    clean: true,
    entry: ["src/index.ts"],
    format: "esm",
    outDir: "dist",
    target: "es2023",
    tsconfig: "tsconfig.app.json",
    deps: {
      neverBundle: ["@prisma/adapter-pg", "@prisma/client", /^@prisma\/client\/.*/u],
      alwaysBundle: [/@repo\/.*/u],
    },
  },
  test: {
    include: ["./src/**/*.test.ts"],
    passWithNoTests: true,
  },
});
