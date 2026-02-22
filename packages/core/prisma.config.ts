import path from "node:path";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: path.join(
    "src",
    "infrastructure",
    "repository",
    "prisma",
    "schema.prisma",
  ),
});
