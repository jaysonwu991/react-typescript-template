const path = require('path')
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')

const productionGzipExtensions = ['js', 'css']
const baseWebpackConfig = require('./webpack.base')

module.exports = merge(baseWebpackConfig, {
  mode: 'production',
  devtool: 'none',
  output: {
    filename: '[name].[contenthash:8].js'
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.(css|scss)$/,
            use: [
              MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader'
              },
              'postcss-loader',
              'sass-loader'
            ]
          },
          {
            test: /\.(jpg|jpeg|bmp|png|webp|gif)$/,
            loader: 'url-loader',
            options: {
              limit: 8 * 1024,
              name: 'imgs/[name].[contenthash:8].[ext]',
              outputPath: 'static',
              publicPath: path.resolve(__dirname, '../dist')
            }
          },
          {
            exclude: [/\.(js|jsx|mjs|ts|tsx|css|scss)$/, /\.html$/, /\.json$/],
            loader: 'file-loader',
            options: {
              name: 'media/[path][name].[contenthash:8].[ext]',
              outputPath: 'static',
              publicPath: path.resolve(__dirname, '../dist')
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeOptionalTags: false,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        removeAttributeQuotes: true,
        removeCommentsFromCDATA: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    new MiniCssExtractPlugin({
      filename: 'style/[name].[contenthash:8].css'
    }),
    new CompressionWebpackPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
      threshold: 10240,
      minRatio: 0.8
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      minChunks: 2,
      maxInitialRequests: 5,
      cacheGroups: {
        commons: {
          chunks: 'all',
          test: /[\\/]node_modules[\\/]/,
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0,
          name: 'common'
        }
      }
    },
    minimizer: [
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: true ? { map: { inline: false } } : {}
      }),
      new TerserPlugin({
        sourceMap: false
      })
    ]
  }
})
