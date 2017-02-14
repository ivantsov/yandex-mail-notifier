const HtmlPlugin = require('html-webpack-plugin');

const pagesPath = './src/pages';

function generateHtmlPlugins(items, extra) {
    return items.map(name => new HtmlPlugin({
        title: '',
        filename: `./${name}.html`,
        chunksSortMode(a, b) {
            // raven has a bigger id
            return b.id - a.id;
        },
        chunks: [
            extra,
            name
        ]
    }));
}

module.exports = {
    pagesPath,
    generateHtmlPlugins
};
