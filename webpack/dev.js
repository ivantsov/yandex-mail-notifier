const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const ShellPlugin = require('webpack-shell-plugin');

const PAGES_PATH = './src/pages';

function generateHtmlPlugins(items) {
    return items.map(name => new HtmlPlugin({
        filename: `./${name}.html`,
        chunks: [name]
    }));
}

module.exports = {
    entry: {
        background: `${PAGES_PATH}/background`,
        popup: `${PAGES_PATH}/popup`,
        settings: `${PAGES_PATH}/settings`
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
        ...generateHtmlPlugins([
            'background',
            'popup',
            'settings'
        ]),
        new ShellPlugin({
            onBuildEnd: ['node ./scripts'],
            dev: false
        })
    ]
};
