import { defineConfig } from "eslint/config";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import nextPlugin from '@next/eslint-plugin-next';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([{
    extends: compat.extends("next/core-web-vitals"),
    plugins: {
        '@next/next': nextPlugin
    },
    rules: {
        'no-unused-vars': 'warn',
        'no-console': 'warn',
        '@next/next/no-html-link-for-pages': 'error',
        '@next/next/no-img-element': 'warn',
    },
    linterOptions: {
        reportUnusedDisableDirectives: 'warn',
    },
    ignores: [
        'node_modules/**',
        '.next/**',
        'out/**',
        'public/**',
    ]
}]);