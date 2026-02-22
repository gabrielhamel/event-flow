import { reactConfig } from "@repo/eslint-config/react";
import pluginQuery from "@tanstack/eslint-plugin-query";

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...reactConfig,
  ...pluginQuery.configs["flat/recommended"],
  {
    rules: {
      "@typescript-eslint/no-restricted-imports": [
        "error",
        {
          paths: [
            {
              importNames: ["useTranslation"],
              message:
                "Please use useTranslation from '@/hooks/useTranslation' instead.",
              name: "react-i18next",
            },
            {
              message:
                "Module wrapped, use '@/tests/testingLibrary' path instead.",
              name: "@testing-library/react",
            },
          ],
        },
      ],
    },
  },
];
