import reactLint from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import { baseConfig } from "./base.js";

/**
 * A custom ESLint configuration for libraries that use React.
 *
 * @type {import("eslint").Linter.Config[]} */
export const reactConfig = [
  ...baseConfig,
  reactLint.configs.flat.recommended,
  {
    rules: {
      "max-lines-per-function": ["off"],
      "max-statements": ["error", 15],
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "variable",
          format: ["PascalCase", "camelCase", "UPPER_CASE"],
        },
      ],
    },
  },
  {
    languageOptions: {
      ...reactLint.configs.flat.recommended.languageOptions,
      parserOptions: {
        ...reactLint.configs.flat.recommended.languageOptions.parserOptions,
      },
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
  },
  {
    settings: { react: { version: "19" } },
    plugins: {
      ...reactRefresh.configs.vite.plugins,
      "react-hooks": reactHooksPlugin,
    },
    rules: {
      ...reactHooksPlugin.configs.recommended.rules,
      ...reactRefresh.configs.vite.rules,
      "react/react-in-jsx-scope": "off",
      "react/jsx-curly-brace-presence": ["error", { props: "never", children: "never" }],
    },
  },
];
