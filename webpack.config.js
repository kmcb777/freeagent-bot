const webpack = require('webpack')
const path = require('path')

const serverPort = process.env.PORT || 3000;
const devPort = process.env.DEV_PORT || 3001;

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
    }),
  ],
  devServer: {
    port: devPort,
    historyApiFallback: true,
    publicPath: '/assets/',
    proxy: {
      '/': {
        target: `http://localhost:${serverPort}/`
      },
      '/rest/*': {
        target: `http://localhost:${serverPort}/`
      }
    }
  }
};
