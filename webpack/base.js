const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const ShellPlugin = require('webpack-shell-plugin');
const {pagesPath} = require('./utils');

module.exports = {
    entry: {
        raven: `${pagesPath}/raven`,
        background: `${pagesPath}/background`,
        popup: `${pagesPath}/popup`,
        settings: `${pagesPath}/settings`,
    },
    output: {
        path: path.resolve('dist/pages'),
        filename: '[name].js',
    },
    resolve: {
        alias: {
            shared: path.resolve('./src/pages/shared'),
        },
    },
    moduleRules: {
        js: {
            test: /\.js$/,
            use: ['babel-loader'],
        },
        css: {
            test: /\.less/,
            use: [
                'style-loader',
                'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
                'less-loader',
            ],
        },
    },
    plugins: {
        copy: new CopyPlugin([{
            from: 'src',
            to: path.resolve('dist'),
            ignore: [
                'manifest/**/*',
                'pages/**/*',
                'locales/**/*',
            ],
        }]),
        shell(target) {
            return new ShellPlugin({
                onBuildEnd: [
                    `node ./scripts/generate-manifest ${target}`,
                    'node ./scripts/locales',
                ],
                dev: false,
            })
        }
    },
};
