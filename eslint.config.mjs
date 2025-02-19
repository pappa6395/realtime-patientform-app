import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-require-imports": "off",
      'react/no-unescaped-entities': 'off',
      '@next/next/no-page-custom-font': 'off',
      "import/no-unresolved": [
        "error",
        {
          "caseSensitive": true
        }
      ]
    },
    ignoreDuringBuilds: true,
  }
];

export default eslintConfig;
