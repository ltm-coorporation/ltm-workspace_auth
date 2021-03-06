
let { User } = require('../modals/User');

let reqParse = require('../components/RequestParse');

function actionMethods(req, res){
    
    let user = new User();
        

    return reqParse(req, res)
        .then(result => {
            if(result.bodyLength == 0) { throw { statusCode: 400, message: 'Malformed Request'}; };
            let prop = ['username', 'password'];
            if(!prop.every(key => key in result.body)) { throw { statusCode: 403, message: 'Username and Password Required'}; }
            
            switch(result.action){
                case 'create':
                case 'update': return user.upsert(result).then(doc =>doc); break;
                case 'info'  : return user.getInfo(result).then(doc =>doc); break;                
                case 'verify': return user.verify(result).then(doc =>doc); break;
                default: throw { statusCode: 404, message: 'Contact Docs for routes info.'}
            }    
        });
}

module.exports = actionMethods;