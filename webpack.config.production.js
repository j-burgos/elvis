const path = require('path')
const webpack = require('webpack')

const base = require('./webpack.config')

module.exports = Object.assign(base, {
  devtool: 'source-map',
  entry: [
    './client/src/index'
  ],
  output: {
    path: path.join(__dirname, 'public', 'dist'),
    filename: 'bundle.js',
    publicPath: '/public/'
  },
  plugins: [
    new webpack.DefinePlugin(process.env),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        screw_ie8: true, // React doesn't support IE8
        warnings: false
      },
      mangle: {
        screw_ie8: true
      },
      output: {
        comments: false,
        screw_ie8: true
      }
    })
  ]
})
