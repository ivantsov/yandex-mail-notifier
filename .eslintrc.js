const {resolve} = require('./webpack/base');

const base = {
  // disabled
  'max-len': 'off',
  'arrow-parens': 'off',
  'space-before-function-paren': 'off',
  'no-prototype-builtins': 'off',

  // modified
  'object-curly-spacing': ['error', 'never'],
  'one-var': [
    'error',
    {
      initialized: 'never',
    },
  ],
  'one-var-declaration-per-line': ['error', 'initializations'],
};

const react = {
  // disabled
  'react/forbid-prop-types': 'off',
  'react/no-array-index-key': 'off',

  // modified
  'react/jsx-filename-extension': ['error', {extensions: ['.js']}],
  'react/sort-comp': [
    'error',
    {
      order: ['static-methods', 'lifecycle', 'rendering', 'everything-else'],
      groups: {
        rendering: ['render', '/^render.+$/'],
      },
    },
  ],
};

const other = {
  'jsx-a11y/no-static-element-interactions': 'off',
};

module.exports = {
  parser: 'babel-eslint',
  extends: 'airbnb',
  env: {
    webextensions: true,
    browser: true,
    jest: true,
  },
  globals: {
    __DEV__: false,
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: {
          resolve,
        },
      },
    },
  },
  rules: {
    ...base,
    ...react,
    ...other,
  },
};
