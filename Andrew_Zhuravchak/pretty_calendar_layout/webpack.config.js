const path = require('path')

module.exports = {
  entry: './js/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },

  node: {
    fs: 'empty', // avoids error messages
  },
}