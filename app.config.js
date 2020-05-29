// // start / entry point is vue_home.js
const path = require("path");
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    entry: path.resolve(__dirname, "./vue_home.js"),
    output:{
        path: path.resolve(__dirname, "./"),
        filename: "vue_home_bundle.js",
        publicPath:"./"
    },
    module: {
        rules: [
            // ... other rules
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
            ,{
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            }
        ]
    },
    plugins: [
        // make sure to include the plugin!
        new VueLoaderPlugin()
    ]
}
