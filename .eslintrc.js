module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "plugin:cypress/recommended",
  ],
  plugins: ["@typescript-eslint", "prettier", "cypress"],
  rules: {
    quotes: ["warn", "double", { avoidEscape: true }],
    "prettier/prettier": [
      "error",
      {
        arrowParens: "avoid",
        bracketSpacing: true,
        endOfLine: "auto",
        trailingComma: "es5",
        tabWidth: 2,
        semi: true,
        singleQuote: false,
        printWidth: 120,
      },
    ],
    "@typescript-eslint/no-namespace": "off",
  },
  ignorePatterns: ["dist/*", "test/*"],
};
