const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');

module.exports = {
  entry: {
    'app': './src/js/index.js',
  },
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash:8].min.js',
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [path.resolve(__dirname, 'src')],
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
    
  ],
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