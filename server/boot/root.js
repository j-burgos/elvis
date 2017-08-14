module.exports = function(server) {
  server.get('/', (req, res, next) => {
    res.sendFile('index.html', { root: `${__dirname}/../../client`})
  })
}
