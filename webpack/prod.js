const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const {generateHtmlPlugins} = require('./utils');
const {
    entry,
    output,
    resolve,
    moduleRules,
    plugins
} = require('./base');

const extractTextPlugin = new ExtractTextPlugin('[name].css');

module.exports = {
    entry,
    output,
    resolve,
    module: {
        rules: [
            moduleRules.js, {
                test: /\.less/,
                loader: extractTextPlugin.extract([
                    'css-loader?modules&importLoaders=1&localIdentName=[hash:base64:10]',
                    'less-loader'
                ])
            }
        ]
    },
    plugins: [
        plugins.copy,
        plugins.shell,
        ...generateHtmlPlugins(entry),
        extractTextPlugin,
        new webpack.DefinePlugin({
            __DEV__: false,
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            mangle: {
                screw_ie8: true,
                keep_fnames: true
            },
            compress: {
                screw_ie8: true
            },
            comments: false
        })
    ]
};
