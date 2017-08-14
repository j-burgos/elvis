'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');
var app = module.exports = loopback();

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Environment: %s', process.env.NODE_ENV);
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module) {
    const mode = process.env.NODE_ENV || 'development'
    if (mode === 'development') {
      const webpack = require('webpack')
      const config = require(`../webpack.config.${mode}`)
      const compiler = webpack(config);
      const webpackDevMiddleware = require('webpack-dev-middleware')
      const webpackHotMiddleware = require('webpack-hot-middleware')
      app.use(webpackDevMiddleware(compiler, {
        noInfo: true,
        publicPath: config.output.publicPath
      }));
      app.use(webpackHotMiddleware(compiler))
    }
    app.start();
  }
});
