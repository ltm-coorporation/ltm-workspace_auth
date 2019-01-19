

let { DBHandler } = require('../components/DBHandler');

class User {
    constructor(){}

    
    
    
    
    upsert(reqObj){        
        let userObj = {};
        userObj.action = reqObj.action;

        // return new Promise((resolve, reject) => {   
        userObj.username = reqObj.body.username;
        userObj.password = reqObj.body.password;
        
        
        
        userObj.profile = reqObj.body.profile || {};
        userObj.config = reqObj.body.config || {};

        let authObj = { 
            username: userObj.username, 
            password: userObj.password
        };

        
        
        
        return this.verify(authObj)
            .then(res => {
                let dbHandler = new DBHandler();
                switch(res){
                    case 'authenticated' : {
                        return dbHandler.updateDBUserData();
                    }
                    case 'unauthenticated' : {
                        return dbHandler.createDBUser(userObj);
                    }
                }
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

module.exports = { User };