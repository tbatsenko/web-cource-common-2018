const path = require('path');
const Dotenv = require('dotenv-webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (env) => {

    return {
        entry: ['./src/js/main.js', './src/styles/main.scss'],
        output: {
            filename: 'main.js',
            path: path.resolve(__dirname, 'dist')
        },
        externals: [{
            xmlhttprequest: '{XMLHttpRequest:XMLHttpRequest}'
        }],
        watch: true,
        mode: 'development',
        module: {
            rules: [
                { // sass / scss loader for webpack
                    test: /\.(sass|scss)$/,
                    loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
                }]
        },
        plugins: [
            new ExtractTextPlugin('[name].css', { // define where to save the file
                allChunks: true,
            }),
            new Dotenv(),
        ],
        devServer: {
            hot: true,
            inline: true,
            host: "localhost",
            port: 8000,
            watchOptions: {
                poll: true
            }
        }
    }
};


