const WriteFilePlugin = require('write-file-webpack-plugin');
const baseConfig = require('./dev');

const config = Object.assign({}, baseConfig, {
    devServer: {
        stats: 'errors-only'
    }
});

config.output.publicPath = 'http://localhost:8080';

config.plugins.push(
    new WriteFilePlugin({
        log: false,
        test: /^((?!hot-update).)*$/
    })
);

module.exports = config;
