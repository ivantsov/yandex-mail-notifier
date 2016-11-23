const webpack = require('webpack');
const baseConfig = require('./dev');

const config = Object.assign({}, baseConfig, {
    devtool: 'cheap-module-source-map'
});

config.plugins.push(
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
);

module.exports = config;
