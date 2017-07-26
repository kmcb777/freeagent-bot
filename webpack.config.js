const webpack = require('webpack')
const path = require('path')

module.exports = {
  devtool: 'source-map',
  entry: {
    app: [
      'babel-polyfill',
      'react-hot-loader/patch',
      path.resolve(__dirname, './src/app/main.js')
    ]
  },
  output: {
    path: path.resolve(__dirname, './src/build/assets'),
    filename: '[name].js'
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      "React": "react",
    })
  ],/*
  devServer: {
    port: 3001,
    historyApiFallback: true,
    publicPath: '/assets/',
    proxy: {
      '/': {
        target: `http://localhost:3000/`
      },
      '/rest/*': {
        target: `http://localhost:3000/`
      }
    }
  }*/
}
