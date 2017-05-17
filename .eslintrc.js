const {resolve} = require('./webpack/base');

const INDENT = 4;

const base = {
    // disabled
    'max-len': 'off',
    'arrow-parens': 'off',
    'arrow-body-style': 'off',
    'no-prototype-builtins': 'off',
    'no-plusplus': 'off',

    // modified
    indent: ['error', INDENT, {
        SwitchCase: 1
    }],
    'brace-style': ['error', 'stroustrup', {
        'allowSingleLine': false
    }],
    'object-curly-spacing': ['error', 'never'],
    'one-var': ['error', {
        initialized: 'never'
    }],
    'one-var-declaration-per-line': ['error', 'initializations'],
};

const react = {
    // disabled
    'react/forbid-prop-types': 'off',
    'react/no-array-index-key': 'off',

    // modified
    'react/jsx-filename-extension': ['error', {extensions: ['.js']}],
    'react/jsx-indent': ['error', INDENT],
    'react/jsx-indent-props': ['error', INDENT],
    'react/jsx-tag-spacing': ['error', {
        closingSlash: 'never',
        beforeSelfClosing: 'never',
        afterOpening: 'never'
    }],
    'react/sort-comp': ['error', {
        order: [
            'static-methods',
            'lifecycle',
            'rendering',
            'everything-else'
        ],
        groups: {
            rendering: [
                'render',
                '/^render.+$/'
            ]
        }
    }],
};

const other = {
    'jsx-a11y/no-static-element-interactions': 'off'
};

module.exports = {
    parser: 'babel-eslint',
    extends: 'airbnb',
    env: {
        webextensions: true,
        browser: true,
        jest: true
    },
    globals: {
        __DEV__: false
    },
    settings: {
        'import/resolver': {
            webpack: {
                config: {
                    resolve
                }
            }
        }
    },
    rules: Object.assign({},
        base,
        react,
        other
    )
};
