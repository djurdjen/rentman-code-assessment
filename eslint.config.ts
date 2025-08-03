import js from '@eslint/js';
import eslintPluginVue from 'eslint-plugin-vue';
import ts from 'typescript-eslint';

export default ts.config(
  js.configs.recommended,
  ...ts.configs.recommended,
  ...eslintPluginVue.configs['flat/recommended'],
  {
    files: ['*.vue', '**/*.vue', '*.ts', '**/*.ts'],
    languageOptions: {
      globals: {
        VERSION_INFO: 'readonly'
      },
      parserOptions: {
        parser: '@typescript-eslint/parser'
      }
    },
    ignores: ['node_modules/', 'dist/', '*.test.ts', '*.story.vue'],
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'comma-dangle': ['warn', 'never'],
      'eol-last': ['error', 'always'],
      'semi': ["warn", 'always'],
      "no-useless-escape": 0,
      "@typescript-eslint/no-unsafe-function-type": 0,
      "@typescript-eslint/no-explicit-any": "off",
      '@typescript-eslint/ban-ts-comment': 0,
      "@typescript-eslint/no-unused-vars": ["warn", {
        "args": "all",
        "argsIgnorePattern": "^_",
        "caughtErrors": "all",
        "caughtErrorsIgnorePattern": "^_",
        "destructuredArrayIgnorePattern": "^_",
        "varsIgnorePattern": "^_",
        "ignoreRestSiblings": true
      }],
      'vue/no-unused-components': 0,
      "vue/no-reserved-component-names": 0,
      "vue/multi-word-component-names": 0,
      "vue/no-v-text-v-html-on-component": 0,
      "vue/one-component-per-file": 0,
      "vue/no-v-html": 1
    }
  }
);
