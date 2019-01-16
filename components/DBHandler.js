
const http = require('http');

class CouchDBHandler{
    constructor(){
        this.method = 'GET';
        this.port = process.env.COUCHDB_PORT || 5984;
        this.auth = process.env.COUCHDB_AUTH;
    }

    method(...args){
        this.method = args[0] || 'GET';
    }

    action(actionName){

        switch(actionName){
            case '_all_docs': this.path = '_all_docs';
        }
        return this;
    }
    
    

    verify(username, password){

        this.auth = `${username}:${password}`;
        this.method = 'HEAD';
        this.path =  `/_users/org.couchdb.user:${username}`;        
        
        return this.execute();
        
    }

    execute(){
        const options = {
            hostname: 'localhost',
            port: this.port,            
            auth: this.auth,
            method: this.method,

            
            
            path: this.path,
            header: {
                'Content-Type': 'application/json',            
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
            
            httpReq.end();
        })
    }
}

module.exports =  { DBHandler: CouchDBHandler };