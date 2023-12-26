module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'standard-with-typescript',
    'plugin:tailwindcss/recommended'
  ],
  ignorePatterns: [
    'dist',
    '.eslintrc.cjs',
    'tailwind.config.js',
    'vite.config.ts',
    'postcss.config.js',
    'vite-env.d.ts'
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', '@stylistic'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true }
    ],
    '@stylistic/jsx-closing-bracket-location': [2, 'line-aligned'],
    '@stylistic/jsx-closing-tag-location': 2,
    '@stylistic/jsx-curly-brace-presence': [2, 'never'],
    '@stylistic/jsx-curly-newline': 2,
    '@stylistic/jsx-curly-spacing': [2, 'never'],
    '@stylistic/jsx-equals-spacing': [2, 'never'],
    '@stylistic/jsx-first-prop-new-line': 2,
    '@stylistic/jsx-indent': [2, 2, {checkAttributes: true, indentLogicalExpressions: true}],
    '@stylistic/jsx-indent-props': [2, 2],
    '@stylistic/jsx-props-no-multi-spaces': 2,
    '@stylistic/jsx-quotes': [2, 'prefer-single'],
    '@stylistic/jsx-self-closing-comp': 2,
    '@stylistic/jsx-tag-spacing': 2,
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
}
