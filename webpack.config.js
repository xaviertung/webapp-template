const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      // {
      //   test: /\.css$/,
      //   loader: 'style-loader!css-loader',
      // },
      {
        test: /\.js$/,
        loader: 'babel-loader',
      }
    ],
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader', 
        })
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      filename: 'index.html',
      hash: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // 开发环境
    // new webpack.HashedModuleIdsPlugin(),  // 生产环境
    new ExtractTextWebpackPlugin({
      filename: 'css/[name].css',
      allChunks: true,
    }),
  ],
  devServer: {
    hot: true,
    inline: true,
    contentBase: path.resolve(__dirname, './dist'),
    port: 3000,
  },
};