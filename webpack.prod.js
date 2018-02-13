const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const LessPluginCleanCSS = require('less-plugin-clean-css');
const LessPluginAutoPrefix = require('less-plugin-autoprefix');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const webpackCommon = require('./webpack.common.js');

const sourcePath = path.resolve(__dirname, 'src');
module.exports = webpackMerge(webpackCommon, {
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
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
        test: /\.css$/,
        use: ExtractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader'
          }], 
        }),
        include: [sourcePath],
      }, {
        test: /\.less$/,
        include: [sourcePath],
        use: ExtractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          use: [{
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
        }),
      }, {
        test: /\.(png|svg|jpe?g|gif)$/,
        include: [sourcePath],
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: 'images/[hash:8][name].[ext]',
          },
        }],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new ExtractTextWebpackPlugin({
      filename: (getPath) => {
        return getPath('css/[name].css');
      },
      allChunks: true,
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./dll/manifest.prod.json')
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'), //html模板路径
      inject: 'body', // 是否将js放在body的末尾
      hash: true,
    }),
    new HtmlWebpackIncludeAssetsPlugin({
      assets: ['vendor.prod.js'],
      append: false,
      hash: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.HashedModuleIdsPlugin(),
    new ParallelUglifyPlugin({
      cacheDir: '.cache/',
      uglifyJS: {
        output: {
          comments: false,
        },
        compress: {
          warnings: false,
          drop_console: true,
          pure_funcs: ['console.log'],
        },
      },
    }),
    new CopyWebpackPlugin([{
      from: 'dll/vendor.prod.js',
      to: 'vendor.prod.js',
    }]),
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
});