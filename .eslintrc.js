module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:nuxt/recommended",
    "plugin:vue/vue3-recommended",
  ],
  parserOptions: {
    ecmaVersion: "latest",
    parser: "@typescript-eslint/parser",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "prettier"],
  rules: {
    "vue/require-default-prop": 0,
    "vue/html-indent": ["error", 2],
    "vue/singleline-html-element-content-newline": 0,
    "vue/multi-word-component-names": 0,
    "vue/component-name-in-template-casing": ["error", "PascalCase"],
  },
};
