import { defineConfig } from "tsup";

export default defineConfig({
  clean: true,
  entry: ["src/index.ts"],
  // Ensure @repo/core's npm dependencies stay external when its source is inlined
  external: ["@prisma/adapter-pg", "@prisma/client", /^@prisma\/client\/.*/u],
  format: "esm",
  noExternal: [/@repo\/.*/u],
  outDir: "dist",
  target: "es2023",
  tsconfig: "tsconfig.app.json",
});
