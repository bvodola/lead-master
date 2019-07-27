var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './public/index.html',
  filename: 'index.html',
  inject: 'body'
})

module.exports = {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  entry: [
    './src/index.js'
  ],
  output: {
    path: path.resolve('build'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
      {
        test: /\.(sass|css|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {loader: "css-loader"},
          {loader: "sass-loader"}
        ]
      },
    ]
  },
  optimization: {
    minimize: false,
    // minimizer: [
    //   new UglifyJsPlugin({
    //     uglifyOptions: {
    //       sourceMap: false,
    //       mangle: false
    //     } 
    //   }),
    // ]
  },
  plugins: [
    HtmlWebpackPluginConfig,
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('staging')
      }
    })
  ]
}
