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

module.exports = {
    entry,
    output: Object.assign({}, output, {
        publicPath: 'http://localhost:8080',
    }),
    resolve,
    module: {
        rules: [
            moduleRules.js,
            moduleRules.css,
        ],
    },
    plugins: [
        plugins.copy,
        plugins.shell,
        ...generateHtmlPlugins([
            'background',
            'popup',
            'settings',
        ]),
        new webpack.DefinePlugin({
            __DEV__: true,
        }),
        new WriteFilePlugin({
            log: false,
            test: /^((?!hot-update).)*$/,
        }),
    ],
    devtool: 'eval',
    devServer: {
        stats: 'errors-only',
    },
};
