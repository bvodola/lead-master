var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './public/index.html',
  filename: 'index.html',
  inject: 'body'
})

module.exports = {
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
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  },
  plugins: [
    HtmlWebpackPluginConfig,
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      mangle: false
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ]
}
