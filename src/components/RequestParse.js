
const qs = require('querystring');

module.exports = (req, res) => {    
    let parsedObj = {};
    parsedObj.action = req.url.split('/')[3];
    parsedObj.route = req.url.split('/')[2];
    parsedObj.bodyLength = 0;
    
    
    return new Promise((resolve, reject) => {

        let body = [];
        let str = '';

        req.on('error', err => reject(err))
            .on('data', chunk => {
                body.push(chunk)
                str+= chunk;
                parsedObj.bodyLength = str.length;
            })
            .on('end', () => {
                
                body = Buffer.concat(body).toString();                    
                parsedObj['body'] = qs.parse(body);
                return resolve(parsedObj);
            });
    });
}