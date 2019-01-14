
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
            return resolve(userObj);
        });
    }

    verify(authObj){
        let msg = (this.username == authObj.username && this.password == authObj.password) ? 'authenticated' : 'inauthenticated';
        return new Promise((resolve, reject) =>  resolve(msg));
    }


    getInfo(){
        let userDoc = {};
        userDoc.profile  = {};        

        return userDoc;
    }
}

module.exports = {User};