import { nextJsConfig } from "@repo/eslint-config/next-js";

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...nextJsConfig,
  {
    files: ["components/landing/**/*.{ts,tsx}"],
    rules: {
      "@next/next/no-img-element": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "react/jsx-no-comment-textnodes": "off",
      "react/no-unescaped-entities": "off",
      "react/prop-types": "off",
      "react-hooks/exhaustive-deps": "off",
    },
  },
];
