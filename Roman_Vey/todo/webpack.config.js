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
    ignored: [
      /node_modules/,
      /data/
    ],
    aggregateTimeout: 100
  },
  devtool: "eval",
  module: {
      rules: [{
        test: /\.scss/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader!sass-loader"
        })
      },
    {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015'],
          plugins: ['transform-class-properties']
        }
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