const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const ShellPlugin = require('webpack-shell-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
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
      exclude: /node_modules/,
    },
    css: {
      test: /\.less$/,
      use: [
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            modules: true,
            localIdentName: '[name]__[local]___[hash:base64:5]',
          },
        },
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
      });
    },
    circularDependency: new CircularDependencyPlugin({
      exclude: /node_modules/,
      failOnError: true,
    }),
  },
};
