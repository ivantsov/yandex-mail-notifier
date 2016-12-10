const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const ShellPlugin = require('webpack-shell-plugin');
const {pagesPath, generateHtmlPlugins} = require('./utils');

module.exports = {
    entry: {
        background: `${pagesPath}/background`,
        popup: `${pagesPath}/popup`,
        settings: `${pagesPath}/settings`
    },
    output: {
        path: path.resolve('dist/pages'),
        filename: '[name].js'
    },
    resolve: {
        alias: {
            shared: path.resolve('./src/pages/shared')
        }
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: ['babel-loader']
        }, {
            test: /\.json$/,
            use: ['json-loader']
        }, {
            test: /\.less/,
            use: [
                'style-loader',
                'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
                'less-loader'
            ]
        }]
    },
    plugins: [
        new CopyPlugin([{
            from: 'src',
            to: path.resolve('dist'),
            ignore: [
                'pages/**/*',
                'locales/*'
            ]
        }]),
        new ShellPlugin({
            onBuildEnd: ['node ./scripts'],
            dev: false
        }),
        ...generateHtmlPlugins([
            'background',
            'popup',
            'settings'
        ])
    ],
    devtool: 'eval'
};
