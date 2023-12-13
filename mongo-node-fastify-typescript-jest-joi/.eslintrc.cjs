module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "jest"], // Quita "fastify" de aquí
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:jest/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  rules: {
    // Reglas básicas recomendadas para TypeScript
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    // Reglas básicas recomendadas para Jest
    "jest/no-disabled-tests": "warn",
    "jest/no-focused-tests": "error",
    "jest/no-identical-title": "error",
    "no-prototype-builtins": "off",
  },
  env: {
    node: true,
    es2020: true,
    jest: true,
  },
};
