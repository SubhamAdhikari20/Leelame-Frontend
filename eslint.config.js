import js from '@eslint/js';
import globals from 'globals';
import react from "eslint-plugin-react";
import reactHooks from 'eslint-plugin-react-hooks';
// import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(["node_modules", "build", "dist", ".env", ".env.*"]),
  {
    files: ['**/*.{js,jsx}'],
    plugins: { react, "react-hooks": reactHooks },
    extends: [
      js.configs.recommended,
      // reactHooks.configs['recommended-latest'],
      // reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      "no-unused-vars": "off",
      "no-console": "off",
      "no-duplicate-imports": "error",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn"
    },
  },
])
