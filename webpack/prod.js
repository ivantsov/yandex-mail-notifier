const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const {generateHtmlPlugins} = require('./utils');
const {entry, output, resolve, moduleRules, plugins} = require('./base');

const extractTextPlugin = new ExtractTextPlugin('[name].css');

module.exports = target => ({
  entry,
  output,
  resolve,
  module: {
    rules: [
      moduleRules.js,
      {
        ...moduleRules.css,
        use: extractTextPlugin.extract(moduleRules.css.use),
      },
    ],
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      __DEV__: false,
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true,
      },
      compress: {
        screw_ie8: true,
      },
      comments: false,
    }),
    plugins.circularDependency,
    plugins.copy,
    plugins.shell(target),
    ...generateHtmlPlugins(entry),
    extractTextPlugin,
  ],
});
