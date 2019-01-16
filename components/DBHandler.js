
const http = require('http');
const qs = require('querystring');
class CouchDBHandler{
    constructor(){
        this.method = 'GET';
        this.port = process.env.COUCHDB_PORT;
        this.auth = process.env.COUCHDB_AUTH;
    }

    httpmethod(...args){ this.method = args[0] || 'GET'; return this;  }

    action(actionName){

        switch(actionName){
            case '_all_docs': this.path = '_all_docs';
        }
        return this;
    }
        

    authUser(authObj){ this.auth = `${authObj.username}:${authObj.password}`; return this; }

    reqPath(path){  this.path = path; return this; }



    verify(authObj){

        
        this.authUser(authObj)
        .httpmethod('HEAD')
        .reqPath(`/_users/org.couchdb.user:${authObj.username}`)
        
        return this.execute();
        
    }

    updateDBUserData(postData){        
        this.method = 'POST';
        return 
    }

    createDBUser(userObj){
        let dataObj = {}
        // Object.assign(dataObj, userObj);

        dataObj.name = userObj.username;
        dataObj.password = userObj.password;        
        dataObj.type = "user";
        dataObj.roles = [];
        this.httpmethod('PUT')
            .reqPath(`/_users/org.couchdb.user:${userObj.username}`)

        // creating new user require db admin credentials
        return this.execute(dataObj);
    }

    execute(dataObj = {}){
        
        let bodyData = JSON.stringify(dataObj);

        const options = {
            hostname: 'localhost',
            port: this.port,            
            auth: this.auth,
            method: this.method,
            path: this.path,
            header: {
                'Content-Type': 'application/json',
                // 'Content-Length': Buffer.byteLength(postData),
                'Referer': 'http://127.0.0.1/'
            }
        };

        
        
        return new Promise((resolve, reject) => {
            let httpReq = http.request(options, (res) => {
                res.setEncoding('utf8');
               
                let data = '';            
                res.on('data', (chunk) => data += chunk);


                res.on('end', () => {
                    let Obj = {}

                    Obj.body = (data.length > 0) ? JSON.parse(data) : {};
                    Obj.statusCode = res.statusCode;
                    return resolve(Obj);
                })
            });
            
            httpReq.on('error', (e) => {
                reject(e);
            });
            
            
            httpReq.write(bodyData);
            httpReq.end();

            this.path = '';
            this.method = '';
        });
    }
}

module.exports =  { DBHandler: CouchDBHandler };