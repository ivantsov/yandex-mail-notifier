const webpack = require('webpack');
const WriteFilePlugin = require('write-file-webpack-plugin');
const {generateHtmlPlugins} = require('./utils');
const {
    entry,
    output,
    resolve,
    moduleRules,
    plugins,
} = require('./base');

const baseConfig = {
    entry,
    output,
    resolve,
    module: {
        rules: [
            moduleRules.js,
            Object.assign({}, moduleRules.css, {
                use: [
                    'style-loader',
                    ...moduleRules.css.use,
                ],
            }),
        ],
    },
    plugins: [
        plugins.copy,
        ...generateHtmlPlugins(entry),
        new webpack.DefinePlugin({
            __DEV__: true,
            'process.env.NODE_ENV': JSON.stringify('development'),
        }),
    ],
};

module.exports = (target) => {
    if (target === 'chrome') {
        return Object.assign({}, baseConfig, {
            output: Object.assign({}, baseConfig.output, {
                publicPath: 'http://localhost:8080',
            }),
            plugins: [
                ...baseConfig.plugins,
                plugins.shell('chrome'),
                new WriteFilePlugin({
                    log: false,
                    test: /^((?!hot-update).)*$/,
                }),
            ],
            devtool: 'eval',
            devServer: {
                stats: 'minimal',
            },
        });
    }

    // firefox
    return Object.assign({}, baseConfig, {
        plugins: [
            ...baseConfig.plugins,
            plugins.shell('firefox'),
        ],
        devtool: 'cheap-module-source-map',
        watch: true,
    });
};
