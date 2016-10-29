const INDENT = 4;

module.exports = {
    extends: 'airbnb',
    env: {
        webextensions: true,
        browser: true
    },
    parser: 'babel-eslint',
    settings: {
        'import/resolver': {
            webpack: {
                config: './webpack/dev.js'
            }
        }
    },
    rules: {
        indent: ['error', INDENT, {
            SwitchCase: 1
        }],
        'linebreak-style': 'off',
        'comma-dangle': ['error', 'never'],
        'brace-style': ['error', 'stroustrup', {
            'allowSingleLine': false
        }],
        'object-curly-spacing': ['error', 'never'],
        'no-unused-expressions': ['error', {
            allowShortCircuit: true,
            allowTernary: true
        }],
        'max-len': 'off',
        'no-param-reassign': 'off',
        'one-var': ['error', {
            initialized: 'never'
        }],
        'one-var-declaration-per-line': ['error', 'initializations'],
        'arrow-parens': 'off',
        'arrow-body-style': 'off',
        'no-prototype-builtins': 'off',

        'react/jsx-filename-extension': ['error', {extensions: ['.js']}],
        'react/jsx-indent': ['error', INDENT],
        'react/jsx-indent-props': ['error', INDENT],
        'react/jsx-space-before-closing': ['error', 'never'],
        'react/forbid-prop-types': 'off',
        'react/no-unused-prop-types': ['error', {
            skipShapeProps: true
        }],
        'react/sort-comp': ['error', {
            order: [
                'static-methods',
                'lifecycle',
                '/^render.+$/',
                'render',
                '/^on.+$/',
                '/^(get|set)(?!(InitialState$|DefaultProps$|ChildContext$)).+$/',
                'everything-else'
            ],
        }],


        'import/prefer-default-export': 'off',
        'jsx-a11y/no-static-element-interactions': 'off'
    }
};
