const https = require('https');
const createRedirectServer = require('./redirect-to-https');
const options = require('./config/certificate');
const app = require('./app');

const port = process.env.PORT || '8080';
https.createServer(options, app).listen(port);

console.log(`HTTPS server listening on port ${port}.`);

// createRedirectServer();
