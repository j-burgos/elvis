var path = require('path');
var webpack = require('webpack');

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
    path: __dirname,
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  plugins: [
    new webpack.DefinePlugin(process.env),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
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
};
