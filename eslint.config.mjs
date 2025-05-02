import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

export default [
  // 기본 설정
  js.configs.recommended,
  
  // Next.js 설정
  ...compat.config({ extends: ["next/core-web-vitals"] }),
  
  // 추가 규칙
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off'
    }
  }
];
