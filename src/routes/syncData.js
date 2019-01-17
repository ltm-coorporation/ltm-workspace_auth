

let reqParse = require('../components/RequestParse');
let { SyncAuth } = require('../modals/SyncAuth');

function actionMethods(req, res) {
    let syncAuth = new SyncAuth();
    res.setHeader('Content-Type', 'application/json');

        
    return reqParse(req, res)
        .then(result => {
            if(result.bodyLength == 0) { throw { statusCode: 400, message: 'Malformed Request'}; };
            let prop = ['api-token'];
            if(!prop.every(key => key in result.body)) {
                throw { statusCode: 403, message: 'ApiToken Required. Reauthenticate will solve this issue.'}; 
            }
            switch(result.action){
                case 'begin': return syncAuth.getKey().then(doc => { return { doc } }); break;
                default : throw { statusCode: 404, message: 'Contact Docs for routes info.'}
            }
        });
}

module.exports = actionMethods;