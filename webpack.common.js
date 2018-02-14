const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    'home': './src/Home/index.js',
    'user-center': './src/UserCenter/index.js',
  },
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash:8].min.js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.less', '.css', '.json'], //后缀名自动补全
    modules: [
      path.resolve(__dirname, 'node_modules')
    ],
    // alias: {
    //   components: path.resolve(__dirname, 'src/components/'),
    // }
  }
};