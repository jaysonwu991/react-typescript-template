const path = require('path');
const env = require('./env.dev');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const APP_PATH = path.resolve(__dirname, '../src');

module.exports = {
  mode: 'development',
  stats: 'errors-warnings',
  devtool: 'eval-cheap-module-source-map',
  entry: [path.resolve(__dirname, '../src/index.tsx')],
  output: {
    publicPath: '/',
    filename: 'scripts/[name].bundle.js',
    path: path.resolve(__dirname, '../dist'),
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@': path.resolve(__dirname, '../src/'),
    },
  },
  devServer: {
    hot: true,
    port: 8080,
    compress: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        enforce: 'pre',
        include: APP_PATH,
        use: [
          {
            loader: require.resolve('swc-loader'),
            options: {
              jsc: {
                parser: {
                  jsx: true,
                  dynamicImport: true,
                  syntax: 'ecmascript',
                },
                transform: {
                  react: {
                    refresh: true,
                    development: true,
                    useBuiltins: true,
                  },
                },
              },
            },
          },
          {
            loader: require.resolve('esbuild-loader'),
            options: {
              target: 'es2015',
            },
          },
        ],
      },
      {
        test: /\.s?[ac]ss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: false,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                ident: 'postcss',
                plugins: {
                  autoprefixer: {},
                },
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|bmp|png|webp|gif)$/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name].[hash:8].[ext]',
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name].[hash:8].[ext]',
        },
      },
      {
        exclude: [/(^|\.(mjs|[jt]sx?|s?css|html|json))$/],
        type: 'asset/resource',
        generator: {
          filename: 'medias/[name].[hash:8].[ext]',
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': env,
      NODE_ENV: env.NODE_ENV,
      API_ENDPOINT: env.API_ENDPOINT,
    }),
    new HtmlWebpackPlugin({
      cache: false,
      inject: true,
      showErrors: true,
      favicon: path.resolve(__dirname, '../public/favicon.ico'),
      template: path.resolve(__dirname, '../public/index.html'),
    }),
    new ReactRefreshWebpackPlugin(),
  ],
};
