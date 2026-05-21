import js from "@eslint/js";
import globals from "globals";

export default [
  // 1. apply recommended rules as base
  js.configs.recommended,

  {
    // 2. files this config applies to
    files: ["src/**/*.js"],

    // 3. replaces "env" + "parserOptions"
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node, // replaces env.node: true
        ...globals.es2021, // replaces env.es2021: true
      },
    },

    // 4. your rules — same as before
    rules: {
      // variables
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "no-var": "error",
      "prefer-const": "error",

      // style
      semi: ["error", "always"],
      quotes: ["error", "double"],
      indent: ["error", 2],
      "comma-dangle": ["error", "always-multiline"],
      "eol-last": ["error", "always"],
      "no-trailing-spaces": "error",

      // best practices
      eqeqeq: ["error", "always"],
      curly: "error",
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-eval": "error",
      "consistent-return": "error",
      "no-throw-literal": "error",

      // async
      "no-async-promise-executor": "error",
      "no-await-in-loop": "warn",
      "require-await": "error",
    },
  },

  // 5. replaces ignorePatterns
  { ignores: ["node_modules/", "dist/", "coverage/"] },
];
