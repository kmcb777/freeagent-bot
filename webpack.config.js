const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const serverPort = process.env.PORT || 3000;
const devPort = process.env.DEV_PORT || 3001;

const extractSass = new ExtractTextPlugin({
    filename: '[name].css',
    disable: process.env.NODE_ENV === 'development'
});

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
    path: path.resolve(__dirname, './src/build/app/assets'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [
            { loader: 'css-loader' },
            { loader: 'sass-loader' }
          ],
          fallback: 'style-loader'
        })
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      'React': 'react',
    }),
    extractSass
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
