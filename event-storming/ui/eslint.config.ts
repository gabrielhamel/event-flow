import { reactConfig } from "@repo/eslint-config/react";

/** @type {import("eslint").Linter.Config[]} */
export default [
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  ...reactConfig,
];
