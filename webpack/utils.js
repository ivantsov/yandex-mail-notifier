const HtmlPlugin = require('html-webpack-plugin');

const pagesPath = './src/pages';
const extraScript = 'raven';

function generateHtmlPlugins(entriesObj) {
  const {raven, ...entries} = entriesObj;

  return entries.map(
    name =>
      new HtmlPlugin({
        filename: `./${name}.html`,
        chunksSortMode(a, b) {
          // raven has a bigger id
          return b.id - a.id;
        },
        chunks: [extraScript, name],
      }),
  );
}

module.exports = {
  pagesPath,
  generateHtmlPlugins,
};
