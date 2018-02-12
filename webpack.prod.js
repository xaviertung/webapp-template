const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
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
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./dll/manifest.json')
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'), //html模板路径
      inject: 'body', // 是否将js放在body的末尾
      hash: true,
      cache:false,veAttributeQuotes: true
    }),
    new HtmlWebpackIncludeAssetsPlugin({
      assets: ['dll/vendor.js'],
      append: false,
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
};