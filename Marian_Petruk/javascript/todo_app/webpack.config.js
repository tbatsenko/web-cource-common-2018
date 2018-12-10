var path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  "mode": "development",
  "entry": "./src/app.js",
  "output": {
    "path": __dirname+'/dist',
    "filename": "main.js"
  },
  "module": {
    "rules": [
      {
        "enforce": "pre",
        "test": /\.(js|jsx)$/,
        "exclude": /node_modules/,
        "use": "eslint-loader"
      },
      {
        "test": /\.scss$/,
        "use": ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]
      }
    ],
  },
  "plugins": [new MiniCssExtractPlugin({filename: "[name]-[contenthash:8].css"})],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  }
};

