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
];

export default eslintConfig;

module.exports = {
  "rules": {
    "@typescript-eslint/no-non-null-asserted-optional-chain": "error"
  }
};

module.exports = {
  "rules": {
    "@typescript-eslint/no-explicit-any": "error"
  }
};

module.exports = {
  "rules": {
    "@typescript-eslint/no-explicit-any": "error"
  }
};
