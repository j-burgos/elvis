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
  module: {
    loaders: [{
      test: /\.js|.jsx$/,
      exclude: /node_modules/,
      include: path.join(__dirname, 'client', 'src'),
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
