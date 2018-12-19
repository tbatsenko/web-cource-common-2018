const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const config = {
  entry: {
      bundle: './js/index',
      styles: './styles/main',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  resolve: {
    extensions: [".js", ".scss"]
  },
  watch: true,
  watchOptions: {
    ignored: /node_modules/,
    aggregateTimeout: 100
  },
  module: {
      rules: [{
        test: /\.scss/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader!sass-loader"
        })
      }]
  },
  plugins: [
    new ExtractTextPlugin("[name].css", {
        allChunks: true
    })
  ],
  mode: "development"   
}

module.exports = config;