const path = require('path')
const argv = require('yargs').argv
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const APP_PATH = path.resolve(__dirname, '../src')

const bundleAnalyzerReport = argv.report

const webpackConfig = {
  plugins: []
}

if (bundleAnalyzerReport) {
  webpackConfig.plugins.push(
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
      reportFilename: path.join(path.resolve(__dirname, '../dist'), './report.html')
    })
  )
}

module.exports = merge(webpackConfig, {
  devtool: 'eval-cheap-module-source-map',
  entry: {
    app: './src/index.tsx',
    vendor: ['react', 'react-dom']
  },
  output: {
    filename: 'script/[name].bundle.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.tsx?$/,
        exclude: /node_modules/,
        include: [APP_PATH],
        loader: 'eslint-loader',
        options: {
          emitWarning: true,
          emitError: true,
          fix: true
        }
      },
      {
        oneOf: [
          {
            test: /\.html$/,
            loader: 'html-loader'
          },
          {
            test: /\.tsx?$/,
            include: APP_PATH,
            use: [
              {
                loader: 'babel-loader',
                options: {
                  cacheDirectory: true
                }
              },
              {
                loader: 'awesome-typescript-loader',
                options: {
                  silent: true
                }
              }
            ]
          },
          {
            test: /\.s?css$/,
            use: [
              { loader: 'style-loader' },
              {
                loader: 'css-loader',
                options: {
                  modules: false
                }
              },
              'postcss-loader',
              'sass-loader'
            ]
          },
          {
            test: /\.(jpe?g|bmp|png|webp|gif)$/,
            type: 'asset/resource',
            generator: {
              filename: 'imgs/[name].[hash:8].[ext]'
            }
          },
          {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            type: 'asset/resource',
            generator: {
              filename: 'fonts/[name].[hash:8].[ext]'
            }
          },
          {
            exclude: [/\.(mjs|[jt]sx?|s?css)$/, /\.html$/, /\.json$/],
            type: 'asset/resource',
            generator: {
              filename: 'media/[path][name].[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, '../src/')
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, '../public/index.html'),
      showErrors: true
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'public'
        }
      ]
    })
  ]
})
