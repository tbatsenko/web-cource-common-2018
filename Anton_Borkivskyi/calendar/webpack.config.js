const path = require('path');

module.exports = {
  mode:"development",
  entry: './src/main.js',

  output: {
    path: path.resolve('dist'),
    filename: 'main.js'
  },

  module: {
    rules: [{
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader']
    }]
  }
};