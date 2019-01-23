
let router = require('./router');
let server = require('http').createServer();
// let hostname = 'localhost';
let port = process.env.PORT || 3001;
server.on('request', (req, res) => router(req, res))
.listen(port, () => console.log(`Server is running at PORT: ${port}`));
module.exports = server;