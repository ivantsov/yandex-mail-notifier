const webpack = require('webpack');
const {pagesPath, generateHtmlPlugins} = require('./utils');
const baseConfig = require('./dev');

const config = Object.assign({}, baseConfig, {
    devtool: 'cheap-module-source-map'
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
        'process.env': {
            NODE_ENV: JSON.stringify('production')
        }
    })
    /* TODO: enable it
       can't be used because UglifyJS doesn't support ES6 features, they should be transpiled
    new webpack.optimize.UglifyJsPlugin({
        compress:{
            warnings: true
        }
    })
    */
];

module.exports = config;
