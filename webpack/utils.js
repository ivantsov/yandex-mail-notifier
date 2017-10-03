const HtmlPlugin = require('html-webpack-plugin');

const pagesPath = './src/pages';

function generateHtmlPlugins(entriesObj) {
  // TODO: not supported by nodejs
  // const {
  //     raven,
  //     ...entries,
  // } = entriesObj;
  const extraScript = 'raven';
  const entries = Object.keys(entriesObj).filter(name => name !== extraScript);

  return entries.map(name => new HtmlPlugin({
    filename: `./${name}.html`,
    chunksSortMode(a, b) {
      // raven has a bigger id
      return b.id - a.id;
    },
    chunks: [
      extraScript,
      name,
    ],
  }));
}

module.exports = {
  pagesPath,
  generateHtmlPlugins,
};
