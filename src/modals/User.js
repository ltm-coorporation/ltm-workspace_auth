

let { DBHandler } = require('../components/DBHandler');

class User {
    constructor(){}

    
    
        
    upsert(reqObj){        
        let userObj = this.prepareUserObj(reqObj);
        let dbHandler = new DBHandler();
        
        return this.verify(reqObj)
            .then(res => {
                
                if(res.statusCode == 200){
                    return dbHandler.updateDBUser(userObj);
                }
                return res;
            })

            .catch(err => {
                if(err.statusCode == 401) { 
                    return dbHandler.createDBUser(userObj) 
                };
                return err;
            });
    }

    verify(reqObj){
    
        let userObj = this.prepareUserObj(reqObj);
        let dbHandler = new DBHandler();
        return dbHandler.verifyDBUser(userObj);
            // .then(res => (res.statusCode != 200) ? 'unauthenticated' : 'authenticated');       
    }

    
    getInfo(reqObj){
        let userObj = this.prepareUserObj(reqObj);

        
        let dbHandler = new DBHandler();
        return dbHandler.getDBUser(userObj);                
    }

    prepareUserObj(reqObj){
        let userDataObj = {};
        userDataObj.action = reqObj.action;
        userDataObj.username = reqObj.body.username;
        userDataObj.password = reqObj.body.password;
        userDataObj.profile = (reqObj.body.profile) ? JSON.parse(reqObj.body.profile) : {};
        userDataObj.config = (reqObj.body.config) ? JSON.parse(reqObj.body.config) : {};
        return userDataObj;
    }
}
module.exports = { User };