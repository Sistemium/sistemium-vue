// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
  },
  globals: {
    window: true,
    localStorage: true,
  },
  env: {
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  plugins: [],
  settings: {
  },
  rules: {
    'import/extensions': ['error', 'always', {
      js: 'never',
      // vue: 'never'
    }],
    'vue/require-default-prop': 'off',
    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: [
        'session', // for context sessions
        'ctx', // for koa routes
        'state', // for vuex state
        'acc', // for reduce accumulators
      ],
    }],
    'import/no-extraneous-dependencies': ['error', {
      // optionalDependencies: ['test/unit/index.js']
    }],
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-use-before-define': ['error', {
      functions: false,
      classes: true,
    }],
    'padded-blocks': 'off',
    'arrow-parens': ['error', 'as-needed'],
    'no-mixed-operators': 'off',
  },
};
