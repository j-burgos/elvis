var server = require('../server');
var ds = server.dataSources.db;
ds.autoupdate(function(er) {
  if (er) throw er;
  console.log('Tables created in ' + ds.adapter.name);
  ds.disconnect();
});
