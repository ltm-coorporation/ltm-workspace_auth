

let { DBHandler } = require('../components/DBHandler');

class User {
    constructor(){
        this.body = {};
    }

    
    
    
    
    upsert(reqObj){        
        let userObj = {};
        userObj.action = reqObj.action;

        return new Promise((resolve, reject) => {   
            userObj.username = reqObj.body.username;
            userObj.password = reqObj.body.password;
            
            
            
            userObj.profile = reqObj.body.profile || {};
            userObj.config = reqObj.body.config || {};

            let couchdbHandler = new CouchDBHandler();

            return couchdbHandler.get()
            return resolve(userObj);
        });
    }

    verify(authObj){
        let dbHandler = new DBHandler();

        
        
        return dbHandler.verify(authObj.username, authObj.password)
            .then(res => (res.statusCode != 200) ? 'unauthenticated' : 'authenticated');        
    }


    getInfo(){
        let userDoc = {};
        userDoc.profile  = {};        

        return userDoc;
    }
}

module.exports = {User};