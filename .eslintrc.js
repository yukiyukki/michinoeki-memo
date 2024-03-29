module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "plugin:react/recommended",
  ],
  plugins: ["@typescript-eslint", "react"],
  settings: {
    react: {
      version: "detect",
    },
  },
  env: { node: true, es6: true },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    sourceType: "module",
    project: "./tsconfig.json",
    warnOnUnsupportedTypeScriptVersion: true,
  },
  rules: {
    "react/jsx-uses-vars": "warn",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
  },
  overrides: [
    {
      files: ["**/*.tsx"],
      rules: {
        "react/prop-types": "off",
      },
    },
    {
      files: ["**/*.test.{tsx,ts}"],
      rules: {
        "@typescript-eslint/ban-ts-ignore": "off",
      },
    },
    {
      files: ["src/actions/*.ts"],
      rules: {
        "@typescript-eslint/no-empty-interface": "off",
      },
    },
    {
      files: ["**/*.ts"],
      rules: {
        "@typescript-eslint/camelcase": "off",
      },
    },
  ],
};
