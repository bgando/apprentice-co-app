const webpack = require('webpack');
const path = require('path');

module.exports = {
  devtool: 'source-map',
  entry: [
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:8080/',
    './client/index.js',
  ],
  output: {
    path: __dirname,
    filename: 'bundle.js',
    headers: { 'Access-Control-Allow-Origin': '*' },
    sourceMapFilename: 'sourceMapsApprentice.map',
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    }],
    loaders: [
      {
        query: {
          presets: ['react', 'es2015', 'stage-1'],
        },
        test: /\.js$/,
        loader: [
          'babel-loader',
        ],
        exclude: /node_modules/,
      },
    ],
  },
  devServer: {
    hot: true,
    historyApiFallback: true,
    contentBase: './',
    outputPath: './',
    proxy: {
      '*': 'http://localhost:3000',
    },
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  plugins: [
    // Allows for sync with browser while developing (like BorwserSync)
    new webpack.HotModuleReplacementPlugin(),
    // Allows error warninggs but does not stop compiling. Will remove when eslint is added
    new webpack.NoErrorsPlugin(),
  ],
};
