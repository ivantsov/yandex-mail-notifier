const webpack = require('webpack');
const WriteFilePlugin = require('write-file-webpack-plugin');
const {generateHtmlPlugins} = require('./utils');
const {
  entry,
  output,
  resolve,
  moduleRules,
  plugins,
} = require('./base');

const baseConfig = {
  entry,
  output,
  resolve,
  module: {
    rules: [
      moduleRules.js,
      {
        ...moduleRules.css,
        use: [
          'style-loader',
          ...moduleRules.css.use,
        ],
      },
    ],
  },
  plugins: [
    plugins.circularDependency,
    plugins.copy,
    ...generateHtmlPlugins(entry),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      __DEV__: true,
    }),
  ],
};

module.exports = (target) => {
  if (target === 'chrome') {
    return {
      ...baseConfig,
      output: {
        ...baseConfig.output,
        publicPath: 'http://localhost:8080',
      },
      plugins: [
        ...baseConfig.plugins,
        plugins.shell('chrome'),
        new WriteFilePlugin({
          log: false,
          test: /^((?!hot-update).)*$/,
        }),
      ],
      devtool: 'eval',
      devServer: {
        stats: 'minimal',
      },
    };
  }

  // firefox
  return {
    ...baseConfig,
    plugins: [
      ...baseConfig.plugins,
      plugins.shell('firefox'),
    ],
    devtool: 'cheap-module-source-map',
    watch: true,
  };
};
