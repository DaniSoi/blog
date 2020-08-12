const http = require('http');

// This server listens to default port of http and
// redirects all http traffic to https
function createRedirectServer() {
  const port = 80;

  http.createServer(function (req, res) {
    res.writeHead(
      301,
      { "Location": "https://" + req.headers['host'] + req.url }
      );
    res.end();
  }).listen(port);

  console.log(`HTTP (redirect) server listening on port ${port}.`);
}

module.exports = createRedirectServer;