var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './public/index.html',
  filename: 'index.html',
  inject: 'body'
})

module.exports = {
  devtool: '#eval-source-map',
  entry: [
    'react-hot-loader/patch',
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
  devServer: {
    port: 4000,
    hot: true,
    historyApiFallback: true,
    proxy: {
      "/api/**": {
        target: "http://localhost:2000",
        secure: false,
        pathRewrite: { "$/": "" }
      },
    }
  },
  plugins: [
    HtmlWebpackPluginConfig,
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
}
