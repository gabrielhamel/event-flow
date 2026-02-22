import jsLint from "@eslint/js";
import tsLint from "typescript-eslint";
import prettier from "eslint-config-prettier";
import turboPlugin from "eslint-plugin-turbo";
import onlyWarnPlugin from "eslint-plugin-only-warn";
import simpleImportSortPlugin from "eslint-plugin-simple-import-sort";
import sortKeysFixPlugin from "eslint-plugin-sort-keys-fix";

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export const baseConfig = [
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  jsLint.configs.all,
  prettier,
  ...tsLint.configs.all,
  {
    rules: {
      "no-console": ["off"],
      "sort-imports": ["off"],
      "one-var": ["off"],
      "no-ternary": ["off"],
      "id-length": ["off"],
      "no-undefined": ["off"],
      "no-void": ["off"],
      "no-plusplus": ["off"],
      "@typescript-eslint/no-misused-promises": [
        "error",
        {
          checksVoidReturn: false,
        },
      ],
      "@typescript-eslint/no-confusing-void-expression": [
        "error",
        {
          ignoreArrowShorthand: true,
        },
      ],
      "@typescript-eslint/restrict-template-expressions": [
        "error",
        {
          allowAny: false,
          allowBoolean: true,
          allowNever: true,
          allowNullish: true,
          allowNumber: true,
          allowRegExp: true,
        },
      ],
      "@typescript-eslint/explicit-member-accessibility": ["off"],
      "@typescript-eslint/explicit-function-return-type": ["off"],
      "@typescript-eslint/explicit-module-boundary-types": ["off"],
      "@typescript-eslint/promise-function-async": ["off"],
      "@typescript-eslint/prefer-readonly-parameter-types": ["off"],
      "@typescript-eslint/no-magic-numbers": ["off"],
      "@typescript-eslint/class-methods-use-this": ["off"],
      "@typescript-eslint/no-unsafe-type-assertion": ["off"],
      "@typescript-eslint/non-nullable-type-assertion-style": ["off"],
    },
  },
  {
    files: [
      "**/__tests__/**",
      "*.test.ts",
      "*.test.tsx",
      "*.spec.ts",
      "*.spec.tsx",
    ],
    rules: {
      "@typescript-eslint/no-unsafe-assignment": ["off"],
      "@typescript-eslint/no-non-null-assertion": ["off"],
      "@typescript-eslint/no-use-before-define": ["off"],
      "max-lines-per-function": ["off"],
      "max-statements": ["off"],
      "no-await-in-loop": ["off"],
    },
  },
  {
    rules: {
      "@typescript-eslint/naming-convention": ["off"],
    },
    files: ["*.config.*"],
  },
  {
    plugins: {
      "simple-import-sort": simpleImportSortPlugin,
    },
    rules: {
      "simple-import-sort/exports": "error",
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            [
              "^react",
              "^@?\\w",
              "^(@|components)(/.*|$)",
              "^\\u0000",
              "^\\.\\.(?!/?$)",
              "^\\.\\./?$",
              "^\\./(?=.*/)(?!/?$)",
              "^\\.(?!/?$)",
              "^\\./?$",
              "^.+\\.?(css)$",
            ],
          ],
        },
      ],
    },
  },
  {
    plugins: {
      "sort-keys-fix": sortKeysFixPlugin,
    },
    rules: {
      "sort-keys-fix/sort-keys-fix": "error",
    },
  },
  {
    plugins: {
      turbo: turboPlugin,
    },
    rules: {
      "turbo/no-undeclared-env-vars": "warn",
    },
  },
  {
    plugins: {
      onlyWarn: onlyWarnPlugin,
    },
  },
  {
    ignores: ["dist/**"],
  },
];
