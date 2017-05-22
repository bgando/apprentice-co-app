const path = require('path');

module.exports = {
  devtool: 'source-map',
  entry: './client/index.js',
  output: {
    path: path.join(__dirname, '/../dist/assets'),
    filename: 'bundle.js',
  },
  watch: true,
  module: {
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
