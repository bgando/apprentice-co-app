const webpack = require('webpack');
const path = require('path');

module.exports = {
  devtool: 'source-map',
  entry: './client/index.js',
  output: {
    path: path.join(__dirname, ''),
    filename: 'bundle.js',
  },
  watch: false,
  module: {
    rules: [{
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    }],
    loaders: [
      {
        exclude: /(node_modules|server)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-1'],
        },
      },
    ],
  },

};
