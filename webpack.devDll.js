const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    vendor: ['lodash', 'moment'],
  },
  output: {
    path: path.resolve(__dirname, 'dev-dll'),
    filename: '[name].[hash].js',
    library: '[name]_[hash]',
  },
  plugins: [
    new CleanWebpackPlugin(['dev-dll']),
    new webpack.DllPlugin({
      path: path.join(__dirname, 'dev-dll', 'manifest.json'),
      name: '[name]_[hash]',
      context: __dirname,
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.ContextReplacementPlugin(/moment[\/\\locale$]/, /zh|en/),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};