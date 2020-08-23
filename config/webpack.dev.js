const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const baseWebpackConfig = require('./webpack.base')

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  output: {
    filename: '[name].[hash:8].js',
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      minify: {
        html5: true
      },
      hash: false
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devtool: '#@cheap-eval-source-map',
  devServer: {
    port: 8080,
    host: 'localhost',
    contentBase: path.join(__dirname, '../public'),
    watchContentBase: true,
    publicPath: '/',
    compress: true,
    historyApiFallback: true,
    hot: true,
    clientLogLevel: 'error',
    open: true,
    overlay: false,
    quiet: false,
    noInfo: false,
    watchOptions: {
      ignored: /node_modules/
    }
  },
  stats: {
    colors: true,
    children: false,
    chunks: false,
    chunkModules: false,
    modules: false,
    builtAt: false,
    entrypoints: false,
    assets: false,
    version: false
  }
})
