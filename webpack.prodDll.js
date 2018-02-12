const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    vendor: ['lodash', 'moment'],
  },
  output: {
    path: path.resolve(__dirname, 'dll'),
    filename: '[name].js',
    library: '[name]_[hash]',
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, 'dll', 'manifest.json'),
      name: '[name]_[hash]',
      context: __dirname,
    }),
  ],
};