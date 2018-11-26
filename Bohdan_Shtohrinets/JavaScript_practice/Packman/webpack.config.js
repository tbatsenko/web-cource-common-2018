const path = require('path');

module.exports = {
    context: __dirname + '/src',

    entry: './game.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
        library: "game"
    },

    watch: false,

    module: {
        rules: [{
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        }],
    }
};
