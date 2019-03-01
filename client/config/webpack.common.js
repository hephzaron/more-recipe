/* eslint-disable
 */

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const dotEnv = require('dotenv');
const autoprefixer = require('autoprefixer');

// call dotenv and it will return an Object with a parsed key 
const env = dotEnv.config().parsed;

// reduce it to a nice object, the same as before
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

/**
 * Sorts chunk in alphabetical order
 * @param { string } prev - Previous Js file
 * @param { string } next - Next Js file
 * @returns { array } sorted files
 */
const chunksSortMode = (prev, next) => (
  prev.names[0].localeCompare(next.names[0])
);
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: path.resolve(__dirname, '../public/index.html'),
  filename: 'index.html',
  inject: 'body',
  chunksSortMode
});

const ProvidePlugin = new webpack.ProvidePlugin({
  '$': 'jquery',
  'jQuery': 'jquery',
  'window.jQuery': 'jquery'
});

const DefinePlugin = new webpack.DefinePlugin(envKeys);

module.exports = {
  entry: {
    aslider: path.resolve(__dirname, '../public/js/slick.slider.min.js'),
    bloader: path.resolve(__dirname, '../src/assets/js/loader/js/loader.js'),
    chelper: path.resolve(__dirname, '../public/js/helper.js'),
    dmain: path.resolve(__dirname, '../src/index.jsx')
  },
  resolve: {
    extensions: [' ', '.js', '.jsx'],
    alias: {
      Assets: path.resolve(__dirname, '../src/assets'),
      Utils: path.resolve(__dirname, '../src/utils'),
      Actions: path.resolve(__dirname, '../src/actions'),
      Routes: path.resolve(__dirname, '../src/Routes'),
      Public: path.resolve(__dirname, '../public'),
      Components: path.resolve(__dirname, '../src/components'),
      General: path.resolve(__dirname, '../src/components/general'),
      Modal: path.resolve(__dirname, '../src/components/Modal')
    }
  },
  module: {
    rules: [{
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(jpg|jpeg|gif|png)?$/,
        loader: 'url-loader',
        exclude: /node_modules/,
        options: {
          name: 'images/[name].[ext]'
        }
      },
      {
        test: /\.(eot|ttf|otf|svg)(\?.*$|$)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff',
        options: {
          name: 'fonts/[name].[ext]'
        }
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
        exclude: /node_modules/
      }, {
        test: /\.scss$/,
        use: [{
          loader: 'style-loader',
          options: {
            sourceMap: true
          }
        }, {
          loader: 'css-loader',
          options: {
            sourceMap: true
          }
        }, {
          loader: 'sass-loader',
          options: {
            sourceMap: true
          }
        }, {
          loader: 'postcss-loader',
          options: {
            indent: 'postcss',
            plugins: () => [
              require('postcss-flexbugs-fixes'),
              autoprefixer({
                browsers: [
                  '>1%',
                  'last 4 versions',
                  'Firefox ESR',
                  'not ie < 9'
                ],
                flexbox: 'no-2009'
              })
            ]
          }
        }]
      }, {
        test: /\.html$/,
        use: ['html-loader']
      }
    ],
    noParse: function(content) {
      return /node_modules\/ws/.test(content);
    }
  },
  externals: ['ws'],
  plugins: [
    HtmlWebpackPluginConfig,
    ProvidePlugin,
    DefinePlugin
  ],
  optimization: {
    splitChunks: {
      name: 'acommon',
      filename: 'js/acommon.js',
      minChunks: 2,
      chunks: 'all'
    }
  },
  stats: {
    colors: true
  },
  target: 'web',
  node: {
    fs: 'empty'
  }
};