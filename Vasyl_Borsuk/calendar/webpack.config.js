const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    entry: ['./src/index.js', './scss/index.scss'],

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
    },

    module: {
        rules: [
            {
                // css|sass|scss loader for webpack
                test: /\.(css|sass|scss)$/,
                loader: ExtractTextPlugin.extract([
                    'css-loader',
                    'sass-loader',
                ]),
            },
        ],
    },

    plugins: [
        new ExtractTextPlugin({
            // define where to save the file
            filename: 'index.css',
            allChunks: true,
        }),
    ],
}
