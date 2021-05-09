const webpack = require('webpack');
const ejs = require('ejs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const { version } = require('./package.json');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const config = {
    context: __dirname,
    entry: {
      'home': './home.js'
    },
    output: {
      path: __dirname + '/dist',
      filename: '[name]_bundle.js',
    },
    resolve: {
      extensions: ['.js', '.vue', '.css'],
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg|ico)$/,
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
            outputPath: '/icons/',
            emitFile: true,
            esModule: false,
          },
        },
      ],
    },
    plugins: [
      
      new VueLoaderPlugin(),
      new MiniCssExtractPlugin({
        filename: '[name]_bundle.css',
      }),
      new CopyPlugin({patterns: [
        { from: 'icons', to: 'icons' },
        { from: 'background.js', to: 'background.js' },
        { from: 'home.html', to: 'home.html', transform: transformHtml },
        // { from: 'home_bundle.css', to: 'home_bundle.css'},
        { from: 'manifest.json', to: 'manifest.json'},
      ]}),
      new CleanWebpackPlugin()
    ],
  };
  function transformHtml(content) {
    return ejs.render(content.toString(), {
      ...process.env,
    });
  }
  
  module.exports = config;
  