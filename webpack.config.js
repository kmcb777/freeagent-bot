const webpack = require('webpack')
const path = require('path')
const fs = require('fs')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const serverPort = process.env.PORT || 3000
const devPort = process.env.DEV_PORT || 3001

const extractSass = new ExtractTextPlugin({
  filename: '[name].css',
  disable: process.env.NODE_ENV === 'development'
})

const nodeModules = {}
fs.readdirSync('node_modules')
  .filter(x => ['.bin'].indexOf(x) === -1)
  .forEach((mod) => { nodeModules[mod] = `commonjs ${mod}`; return 0 })

const frontend = {
  devtool: 'source-map',
  entry: {
    app: [
      'babel-polyfill',
      'react-hot-loader/patch',
      path.resolve(__dirname, './src/app/main.js')
    ]
  },
  output: {
    path: path.resolve(__dirname, './dist/assets'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
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
      React: 'react'
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
      '/api/*': {
        target: `http://localhost:${serverPort}/`
      }
    }
  }
}

const server = {
  entry: ['babel-polyfill', './src/main.js'],
  target: 'node',
  node: {
    __dirname: false,
    __filename: false
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js'
  },
  plugins: [],
  externals: nodeModules,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ]
  }
}

module.exports = (env = {}) => {
  if (env.frontend !== undefined) {
    return frontend
  }

  if (env.server !== undefined) {
    return server
  }

  return [frontend, server]
}
