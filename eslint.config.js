import { defineConfig, globalIgnores } from "eslint/config"
import globals from "globals"
import { fixupConfigRules } from "@eslint/compat"
import tsParser from "@typescript-eslint/parser"
import reactRefresh from "eslint-plugin-react-refresh"
import js from "@eslint/js"
import { FlatCompat } from "@eslint/eslintrc"
import { fileURLToPath } from "node:url"
import { dirname } from "node:path"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default defineConfig([
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
        "plugin:react-hooks/recommended"
      )
    ),
    plugins: {
      "react-refresh": reactRefresh,
    },
    rules: {},
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  globalIgnores([
    "**/dist",
    "**/tailwind.config.js",
    "**/vite.config.ts",
    ".prettierrc.mjs",
    "eslint.config.js",
  ]),
])
