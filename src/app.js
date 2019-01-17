let http = require('http');
let router = require('./router');
let server = http.createServer();
let hostname = 'localhost';
let port = 3000;

server.on('request', (req, res) => router(req, res))
.listen(port, hostname, () => console.log(`Server is running at http://${hostname}:${port}`));