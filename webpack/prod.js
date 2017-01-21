const webpack = require('webpack');
const {pagesPath, generateHtmlPlugins} = require('./utils');
const baseConfig = require('./dev');

const config = Object.assign({}, baseConfig, {
    devtool: 'source-map'
});

config.entry.raven = `${pagesPath}/raven`;

// add raven script to html
const [copyPlugin, shellPlugin] = config.plugins;
config.plugins = [
    copyPlugin,
    shellPlugin,
    ...generateHtmlPlugins([
        'background',
        'popup',
        'settings'
    ], 'raven'),
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
];

module.exports = config;
