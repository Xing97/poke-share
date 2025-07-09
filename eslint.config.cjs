const { defineConfig, globalIgnores } = require("eslint/config")

const globals = require("globals")

const { fixupConfigRules } = require("@eslint/compat")

const tsParser = require("@typescript-eslint/parser")
const reactRefresh = require("eslint-plugin-react-refresh")
const js = require("@eslint/js")

const { FlatCompat } = require("@eslint/eslintrc")

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

module.exports = defineConfig([
  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },

      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",

      parserOptions: {
        project: ["./tsconfig.json", "./tsconfig.node.json"],
        tsconfigRootDir: __dirname,
      },
    },

    extends: fixupConfigRules(
      compat.extends(
        "prettier",
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended-type-checked",
        "plugin:react-hooks/recommended",
        "plugin:react/recommended",
        "plugin:react/jsx-runtime",
        "plugin:tailwindcss/recommended"
      )
    ),

    plugins: {
      "react-refresh": reactRefresh,
    },

    rules: {
      "react-refresh/only-export-components": [
        "warn",
        {
          allowConstantExport: true,
        },
      ],
    },

    settings: {
      react: {
        version: "detect",
      },
    },
  },
  globalIgnores([
    "**/dist",
    "**/eslint.config.cjs",
    "**/tailwind.config.js",
    "**/vite.config.ts",
    "**/postcss.config.js",
    "**/vite-env.d.ts",
    "**/*.mjs",
  ]),
])
