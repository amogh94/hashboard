const path = require("path");
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: path.resolve(__dirname, "./home.js"),
    output:{
        path: path.resolve(__dirname, "./"),
        filename: "home_bundle.js",
        publicPath:"./"
    },
    module: {
        rules: [
        {
            test: /\.vue$/,
            loader: 'vue-loader'
        }
        ,{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
        },{
            test: /\.css$/,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader'
            ],
        }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: 'home_bundle.css',
        })
    ]
}
