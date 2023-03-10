const { defineConfig } = require('eslint-define-config');
module.exports = defineConfig({
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    sourceType: 'module',
    jsxPragma: 'React',
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:jest/recommended',
  ],
  rules: {
    'prefer-const': 'warn',
    '@typescript-eslint/no-namespace': 'warn',
    'no-var': 'warn',
    'vue/no-unused-vars': 'warn',
    '@typescript-eslint/no-array-constructor': 'warn',
    'prefer-rest-params': 'warn',
    'vue/no-mutating-props': 'warn',
    'vue/valid-v-for': 'warn',
    'vue/no-use-v-if-with-v-for': 'warn',
    'vue/no-side-effects-in-computed-properties': 'warn',
    'vue/no-async-in-computed-properties': 'warn',
    'vue/no-deprecated-slot-scope-attribute': 'warn',
    '@typescript-eslint/no-inferrable-types': 'warn',
    'vue/no-reserved-props': 'warn',
    'vue/no-dupe-keys': 'warn',
    'vue/valid-v-show': 'warn',
    'vue/no-deprecated-v-on-native-modifier': 'warn',
    'vue/require-valid-default-prop': 'warn',
    '@typescript-eslint/no-unnecessary-type-constraint': 'warn',
    'vue/no-useless-template-attributes': 'warn',
    'vue/script-setup-uses-vars': 'error',
    'vue/multi-word-component-names': 'warn',
    'vue/no-unused-components': 'warn',
    'vue/require-v-for-key': 'warn',
    'vue/return-in-computed-property': 'warn',
    'vue/no-setup-props-destructure': 'warn',
    'vue/no-ref-as-operand': 'warn',
    'vue/no-textarea-mustache': 'warn',
    'vue/no-deprecated-slot-attribute': 'warn',
    'vue/valid-v-on': 'warn',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'vue/custom-event-name-casing': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    'no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    'space-before-function-paren': 'off',

    'vue/attributes-order': 'off',
    'vue/one-component-per-file': 'off',
    'vue/html-closing-bracket-newline': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/attribute-hyphenation': 'off',
    'vue/require-default-prop': 'off',
    'vue/html-self-closing': [
      'warn',
      {
        html: {
          void: 'always',
          normal: 'never',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      },
    ],
  },
});
