let path = require('path');

module.exports = {
  watch: true,
  entry: './js/main.js',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, './js'),
    filename: 'main-bundled.js'
  },
  module: {
    rules: [
      {
        test: /\.hbs$/,
        use: [
          {
            loader: 'handlebars-loader',
            options: { helperDirs: path.resolve(__dirname, './js/helpers') }
          }
        ]
      },
      {
        test: /\.(s*)css$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader'
      }
    ]
  }
};
