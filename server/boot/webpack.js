'use strict';

module.exports = function(app) {
  const mode = process.env.NODE_ENV || 'development'
  if (mode === 'development') {
    const webpack = require('webpack')
    const config = require(`../../webpack.config.${mode}`)
    const compiler = webpack(config);
    const webpackDevMiddleware = require('webpack-dev-middleware')
    const webpackHotMiddleware = require('webpack-hot-middleware')
    app.use(webpackDevMiddleware(compiler, {
      noInfo: true,
      publicPath: config.output.publicPath
    }));
    app.use(webpackHotMiddleware(compiler))
  }
}
