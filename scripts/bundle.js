import ExtractTextPlugin from 'extract-text-webpack-plugin';
import WebpackDevServer from 'webpack-dev-server';
import debug from 'debug';
import path from 'path';
import { spawn } from 'child_process';
import webpack from 'webpack';

export const DEVELOPMENT = true;//process.env.NODE_ENV === 'development'
export const PRODUCTION = process.env.NODE_ENV === 'production';
export const BROWSER_PORT = process.env.NODE_BROWSER_DEV_PORT || 3001;
export const SERVER_PORT = process.env.NODE_SERVER_DEV_PORT || 3000;

export const browserConfig = {
  stats: {
    colors: true,
    reasons: DEVELOPMENT,
    hash: DEVELOPMENT,
    version: DEVELOPMENT,
    timings: true,
    chunks: DEVELOPMENT,
    chunkModules: DEVELOPMENT,
    cached: DEVELOPMENT,
    cachedAssets: DEVELOPMENT
  },
  entry: {
    app: [
      /*'babel-polyfill',
      `webpack-dev-server/client?http://localhost:${BROWSER_PORT}`,
      'webpack/hot/only-dev-server',*/
      path.join(__dirname, '../src/app/main.js')
    ]
  },
  output: {
    path: path.join(__dirname, '../src/build/assets'),
    filename: '[name].js'
  },
  watch: true,
  module: {
    rules: [
      /*{
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint'
      }*/
      {
        test: /\.js$/,
        exclude: [
          path.resolve(__dirname, 'node_modules'),
        ],
        use: [
          'react-hot-loader',
          'babel-loader'
        ]
      }
    ]
  },
  plugins: [
    /*
    new webpack.ProgressPlugin((percentage, message) => {
      const MOVE = new Buffer('1b5b3130303044', 'hex').toString()
      const CLEAR = new Buffer('1b5b304b', 'hex').toString()
      let progress = Math.round(percentage * 100)
      let loading = `${CLEAR} ${progress} %: ${message} ${MOVE}`

      if (percentage * 100 >= 100) {
        loading = CLEAR
      }

      process.stdout.write(loading)
    }),
    new webpack.NoErrorsPlugin(),
    ...(() => {
      let plugins = []

      if (DEVELOPMENT) {
        plugins = [
          new webpack.HotModuleReplacementPlugin()
        ]
      }

      if (PRODUCTION) {
        plugins = [
          new ExtractTextPlugin('style.css', {
            allChunks: true
          }),
          new webpack.optimize.DedupePlugin(),
          new webpack.optimize.OccurenceOrderPlugin(),
          new webpack.optimize.AggressiveMergingPlugin(),
          new webpack.optimize.UglifyJsPlugin({
            compress: {
              warnings: false
            }
          })
        ]
      }

      return plugins
    })()*/
  ],
  devtool: 'sourcemap'
}

webpack(browserConfig).run(() => {
  console.log('hey')
});
