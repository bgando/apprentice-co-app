const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin({
  filename: '[name].[contenthash].css',
  disable: process.env.NODE_ENV === 'development',
});

module.exports = {
  devtool: 'source-map',
  context: path.resolve(__dirname, ''),
  entry: './client/index.js',
  output: {
    path: path.join(__dirname, ''),
    filename: 'bundle.js',
    publicPath: path.join(__dirname, ''),
  },
  watch: false,
  module: {
    rules: [{
      test: /\.scss$/,
      use: extractSass.extract({ use: [{
        loader: 'style-loader', // creates style nodes from JS strings
      }, {
        loader: 'css-loader', // translates CSS into CommonJS
      }, {
        loader: 'sass-loader', // compiles Sass to CSS
      }],
       // use style-loader in development
        fallback: 'style-loader',
      }),
    },
    {
      exclude: /(node_modules|server)/,
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015', 'stage-1'],
      },
    },
    ],
  },
  plugins: [
    new ExtractTextPlugin('styles.css'),
  ],
};
