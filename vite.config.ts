import pluginQuery from "@tanstack/eslint-plugin-query";
import pluginRouter from "@tanstack/eslint-plugin-router";
import { defineConfig } from "vite-plus";

export default defineConfig({
  staged: {
    "*": "vp check --fix",
  },
  fmt: {
    ignorePatterns: ["apps/ui/src/routes.ts"],
    sortImports: {
      newlinesBetween: false,
      groups: [
        "type-import",
        ["value-builtin", "value-external"],
        "type-internal",
        "value-internal",
        ["type-parent", "type-sibling", "type-index"],
        ["value-parent", "value-sibling", "value-index"],
        "unknown",
      ],
    },
  },
  lint: {
    jsPlugins: [
      {
        name: "@tanstack/router",
        specifier: "@tanstack/eslint-plugin-router",
      },
      {
        name: "@tanstack/query",
        specifier: "@tanstack/eslint-plugin-query",
      },
    ],
    options: { typeAware: true, typeCheck: true, denyWarnings: true },
    plugins: ["import"],
    rules: {
      "import/no-cycle": "error",
      ...pluginRouter.configs.recommended.rules,
      ...pluginQuery.configs.recommendedStrict.rules,
    },
  },
  run: {
    cache: true,
  },
});
