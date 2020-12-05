const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const baseWebpackConfig = require('./webpack.base')

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  output: {
    filename: 'script/[name].[hash:8].js',
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
  devServer: {
    hot: true,
    open: true,
    port: 8080,
    quiet: false,
    noInfo: false,
    overlay: false,
    compress: true,
    publicPath: '/',
    clientLogLevel: 'error',
    historyApiFallback: true,
    contentBase: path.join(__dirname, '../public'),
    watchContentBase: true,
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
