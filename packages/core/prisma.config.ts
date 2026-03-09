import { defineConfig } from "prisma/config";

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL,
  },
  migrations: {
    path: "./src/infra/prisma/migrations",
  },
  schema: "./src/infra/prisma/schema.prisma",
});
