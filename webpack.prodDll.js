const path = require('path');
const webpack = require('webpack');
const LessPluginCleanCSS = require('less-plugin-clean-css');
const LessPluginAutoPrefix = require('less-plugin-autoprefix');

const sourcePath = path.resolve(__dirname, 'src');
module.exports = {
  entry: {
    vendor: ['lodash', 'moment'],
  },
  output: {
    path: path.resolve(__dirname, 'dll'),
    filename: '[name].prod.js',
    library: '[name]_[hash]',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [{
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        }],
        include: [sourcePath],
      }, {
        test: /\.less$/,
        include: [sourcePath],
        use: [{
          loader: 'style-loader',
      }, {
        loader: 'css-loader',
        options: {
        sourceMap: true,
        },
      }, {
        loader: 'less-loader',
        options: {
          plugins: [
            new LessPluginCleanCSS({ advanced: true }),
            new LessPluginAutoPrefix(),
          ],
        }
      }],
    }],
  },
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh|en/),

    new webpack.DllPlugin({
      path: path.join(__dirname, 'dll', 'manifest.prod.json'),
      name: '[name]_[hash]',
      context: __dirname,
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};