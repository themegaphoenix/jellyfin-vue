module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:jsdoc/recommended',
    'plugin:json/recommended',
    'plugin:@typescript-eslint/recommended',
    '@nuxtjs/eslint-config-typescript',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:promise/recommended',
    'plugin:nuxt/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript'
  ],
  plugins: ['prettier', 'promise', 'import', 'jsdoc'],
  rules: {
    'import/newline-after-import': 'error',
    'import/order': 'error',
    'jsdoc/require-hyphen-before-param-description': 'error',
    'promise/no-nesting': 'error',
    'promise/no-return-in-finally': 'error',
    'promise/prefer-await-to-callbacks': 'error',
    'promise/prefer-await-to-then': 'error',
    '@typescript-eslint/explicit-function-return-type': 'error',
    '@typescript-eslint/prefer-ts-expect-error': 'error',
    'prefer-arrow-callback': 'error',
    curly: 'error',
    // Force some component order stuff, formatting and such, for consistency
    'vue/component-name-in-template-casing': [
      'error',
      'kebab-case',
      {
        ignores: []
      }
    ],
    'vue/order-in-components': 'error',
    'vue/v-bind-style': 'error',
    'vue/v-on-style': 'error',
    'vue/v-slot-style': 'error',
    'vue/attributes-order': 'error',
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always'
        }
      }
    ],
    'vue/multiline-html-element-content-newline': 'error'
  },
  settings: {
    'import/resolver': {
      nuxt: {
        extensions: ['.js', '.ts', '.vue', '.json']
      }
    }
  },
  overrides: [
    {
      files: ['**/*.spec.ts'],
      plugins: ['jest', 'jest-formatting'],
      env: {
        'jest/globals': true
      },
      extends: [
        'plugin:jest/recommended',
        'plugin:jest/style',
        'plugin:jest-formatting/strict'
      ],
      rules: {
        'jest/consistent-test-it': ['error']
      }
    }
  ]
};
