const path = require('path')
const webpack = require('webpack')

const base = require('./webpack.config')

module.exports = Object.assign(base, {
  devtool: 'eval-source-map',
  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',
    './client/src/index'
  ],
  plugins: [
    new webpack.DefinePlugin(process.env),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
})
