const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const LessPluginAutoPrefix = require('less-plugin-autoprefix');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');

const webpackCommons = require('./webpack.common.js');

const sourcePath = path.resolve(__dirname, 'src');
module.exports = webpackMerge(webpackCommons, {
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
        use: ['style-loader', 'css-loader'],
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
            sourceMap: true,
            plugins: [
              new LessPluginAutoPrefix()
            ]
          },
        }],
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
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./dev-dll/manifest.json')
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'), //html模板路径
      inject: 'body', // 是否将js放在body的末尾
      hash: true,
      cache:false,
    }),
    new HtmlWebpackIncludeAssetsPlugin({
      assets: [{ path: 'dev-dll', glob: '*.js', globPath: 'dev-dll/' }],
      append: false,
      hash: false,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // 开发环境
  ],
  devServer: {
    publicPath: '/',
    compress: true,
    port: 3000,
    clientLogLevel: 'none', //不再输出繁琐的信息
    historyApiFallback: true,
    overlay: true, //浏览器全屏显示错误信息
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
});