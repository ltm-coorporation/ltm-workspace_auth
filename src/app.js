
let router = require('./router');
let server = require('http').createServer();
let hostname = process.env.OPENSHIFT_NODEJS_IP;
let port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 3001;
server.on('request', (req, res) => router(req, res))
.listen(port, hostname,  () => console.log(`Server is running at PORT: ${port}`));
module.exports = server;