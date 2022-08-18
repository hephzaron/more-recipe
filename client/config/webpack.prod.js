/* eslint-disable
 */
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CompressionPlugin = require('compression-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const dotEnv = require('dotenv');
const common = require('./webpack.common');

dotEnv.config();

const { PRODUTION_SERVER_URL } = process.env;

const extractSass = new ExtractTextPlugin({
  filename: 'css/[name].[contenthash].css',
  allChunks: true
});

module.exports = merge(common, {
  mode: 'production',
  module: {
    rules: [{
      test: /\.(css|scss)$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: {
          loader: 'css-loader',
          options: {
            minimize: true
          }
        }
      })
    }]
  },
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: 'js/[name].js',
    publicPath: '/'
  },
  plugins: [
    extractSass,
    new CompressionPlugin({
      threshold: 10240,
    }),
    new webpack.EnvironmentPlugin({
      SERVER_URL: PRODUTION_SERVER_URL
    })
  ],
  optimization: {
    minimize: true
  }
});