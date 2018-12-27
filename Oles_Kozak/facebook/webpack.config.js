const path = require("path")

module.exports = {
    mode: "development",
    entry: "./js/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
    },

    module: {
        rules: [{ test: /\.hbs/, loader: "handlebars-template-loader" }],
    },

    node: {
        fs: "empty", // avoids error messages
    },
};