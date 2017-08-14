const path = require('path')
const webpack = require('webpack')

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devtool: 'eval',
  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',
    './client/src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  module: {
    loaders: [{
      test: /\.js|.jsx$/,
      exclude: /node_modules/,
      include: path.join(__dirname, 'client'),
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['react']
        }
      }
    },
    {
      test: /\.css$/,
      use: [
        { loader: "style-loader" },
        { loader: "css-loader" }
      ]
    }]
  }
}
