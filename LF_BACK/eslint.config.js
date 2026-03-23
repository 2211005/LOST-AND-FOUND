const { defineConfig } = require("eslint/config");

module.exports = defineConfig([
  {
    files: ["src/**/*.js"],
    ignores: ["node_modules/**", "coverage/**"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",
      globals: {
        process: "readonly",
        console: "readonly",
        __dirname: "readonly",
        module: "readonly",
        require: "readonly"
      }
    },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "error",
      "prefer-const": "warn",
      "semi": ["warn", "always"],
      "no-console": "off"
    }
  }
]);