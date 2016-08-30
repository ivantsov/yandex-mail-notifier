const webpack = require('webpack');
const WriteFilePlugin = require('write-file-webpack-plugin');
const baseConfig = require('./dev');

const config = Object.assign({}, baseConfig, {
    devtool: 'eval'
});

config.output.publicPath = 'http://localhost:3000/';

config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new WriteFilePlugin({
        log: false,
        test: /^((?!hot-update).)*$/
    })
);

// TODO: check that it works for every entry
Object.keys(config.entry).forEach(key => {
    config.entry[key] = [
        config.entry[key],
        'webpack-dev-server/client',
        'webpack/hot/dev-server'
    ];
});

module.exports = config;
