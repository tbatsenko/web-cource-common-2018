const path = require('path');
module.exports = {
  entry: './src/App.js',
  watch:true,
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: "/dist/",
    filename: 'bundle.js'

  }
};