const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function generateHtmlPlugins(items) {
    return items.map(name => new HtmlWebpackPlugin({
        filename: `./${name}.html`,
        chunks: [name]
    }));
}

module.exports = {
    entry: {
        background: './src/pages/background',
        popup: './src/pages/popup'
    },
    output: {
        path: path.resolve('dist/pages'),
        filename: '[name].js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel'
        }]
    },
    plugins: [
        new CopyWebpackPlugin([{
            from: 'src',
            to: path.resolve('dist'),
            ignore: ['pages/**/*']
        }, {
            from: 'src/pages/options.html', // TODO: find out how to not create this additional entity and use ignore pattern above
            to: path.resolve('dist/pages')
        }]),
        ...generateHtmlPlugins([
            'background',
            'popup'
        ])
    ]
};
