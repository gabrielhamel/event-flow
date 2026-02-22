import reactHooksPlugin from "eslint-plugin-react-hooks";
import reactLint from "eslint-plugin-react";
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
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
  },
  {
    plugins: {
      "react-hooks": reactHooksPlugin,
    },
    settings: { react: { version: "detect" } },
    rules: {
      ...reactHooksPlugin.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "react/jsx-curly-brace-presence": [
        "error",
        { props: "never", children: "never" },
      ],
    },
  },
];
