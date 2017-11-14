var webpack = require('webpack');

module.exports = {
    entry: "./src/js/app.js",
    output: {
        path: __dirname + '/build/js/',
        publicPath: "build/",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: "babel",
                include: [/src/]
            },
            {
                test: /\.jsx$/,
                loader: "react-hot!babel",
                exclude: [/node_modules/, /build/]
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader!autoprefixer-loader",
                exclude: [/node_modules/, /build/]
            },
            {
                test: /\.json$/,
                loader: "json-loader",
                include: "path/to/your/sources"
            }
        ]
    }
}