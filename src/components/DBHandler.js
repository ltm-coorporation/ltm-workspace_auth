
const http = require('http');
const qs = require('querystring');
class CouchDBHandler{
    constructor(){
        this.method = 'GET';
        this.port = process.env.COUCHDB_PORT;
        this.auth = process.env.COUCHDB_AUTH;
        
        
        this.headers = { "Content-Type": "application/json" };
    }

    httpMethod(...args){ this.method = args[0] || 'GET'; return this;  }

    httpHeaders(key, value){ this.headers[`"${key}"`] = `"${value}`; return this; }

    authUser(dataObj = {}){ 
        if(Object.keys(dataObj).length == 0){
            this.auth = process.env.COUCHDB_AUTH;
        } else {
            this.auth = `${dataObj.name}:${dataObj.password}`; 
        }
        
        return this; 
    }
    
    reqPath(path){  this.path = path; return this; }

    verifyDBUser(userObj){        
        
        let dataObj = this.prepareDataObj(userObj);

        this.authUser(dataObj);

        this.httpMethod('HEAD')
            .reqPath(`/_users/org.couchdb.user:${dataObj.name}`);        
        
        return this.execute();        
    }

    getDBUser(userObj){
        let dataObj = this.prepareDataObj(userObj);
        
        this.authUser(dataObj);
        
        this.httpMethod('GET')
            .reqPath(`/_users/org.couchdb.user:${dataObj.name}`);        
        return this.execute()
            .then(res => {
                delete res.body._id;
                delete res.body._rev;
                delete res.body.password_scheme;
                delete res.body.iterations;
                delete res.body.derived_key;
                delete res.body.salt;
            return res;
        });
    }

    updateDBUser(userObj){

        let dataObj = this.prepareDataObj(userObj);

        this.authUser(dataObj);

        this.httpMethod('GET')
            .reqPath(`/_users/org.couchdb.user:${dataObj.name}`)
        
        return this.execute()
        .then(res => {
            let rev = res.body._rev;

            // this.authUser(dataObj)
            this.httpMethod('PUT')
                .reqPath(`/_users/org.couchdb.user:${dataObj.name}?rev=${rev}`);

            return this.execute(dataObj)          
        })
        
        
        .then(res => {
            return this.getDBUser(userObj)            
        })
        .then(res => { res.statusCode = 201;
            return res;
        });
    }

    prepareDataObj(userObj){
        let dataObj = {}
        dataObj.name = userObj.username;
        dataObj.password = userObj.password;        
        dataObj.type = "user";
        dataObj.roles = [];
        dataObj.profile = userObj.profile || {};
        dataObj.config = userObj.config || {};

        return  dataObj;
    }

    createDBUser(userObj){        
        let dataObj = this.prepareDataObj(userObj);
        
        this.authUser();

        this.httpMethod('GET')
            .reqPath(`/_users/org.couchdb.user:${dataObj.name}`);
        
        // creating new user require db admin credentials
        return this.execute(dataObj)
            .then(res =>{
                switch(res.statusCode){
                    case 404: {
                        this.httpMethod('PUT')
                        return this.execute(dataObj)
                    }
                    case 200: throw { statusCode: 409, message: 'User Exist! Kindly check username and password.'}
                }
            })
        .then(() => {
                return this.createDBForUser(dataObj);
            })
            .then(() => {
                return this.getDBUser(userObj)            
            })
            .then(res => {
                res.statusCode = 201;
                return res;
            });
    }

    deleteDBUser(userObj){
        let dataObj = this.prepareDataObj(userObj);
        this.authUser(dataObj);        
        this.httpMethod('GET')
            .reqPath(`/_users/org.couchdb.user:${dataObj.name}`)
        // console.log(dataObj);
        return this.execute(dataObj)
        .then(res => {
            let rev = res.body._rev;            
            this.httpMethod('DELETE')
                .reqPath(`/_users/org.couchdb.user:${dataObj.name}?rev=${rev}`);
            return this.execute();
        });
    }

    createDBForUser(dataObj){
        
        this.authUser(); // defaults to couchdb admin
        
        this.httpMethod('PUT')
            .reqPath(`/${dataObj.name}`);
        
        return this.execute()
            .then(res => {
                if(res.statusCode == 201){
                    let dbSecurity = {
                        "admins":{
                            "names": [`${dataObj.name}`],
                            "roles": []
                        },
                        "members":{ "names": [], "roles": []}
                    };

                    this.reqPath(`/${dataObj.name}/_security`);

                    return this.execute(dbSecurity);
                }
            });
        
    }

    execute(dataObj = {}){
        
        let bodyData = JSON.stringify(dataObj);

        const options = {
            hostname: 'localhost',
            port: this.port,
            auth: this.auth,
            method: this.method,
            path: this.path,
            headers: this.headers
        };
        
        return new Promise((resolve, reject) => {
            let httpReq = http.request(options, (res) => {
                res.setEncoding('utf8');
               
                let data = '';            
                res.on('data', (chunk) => data += chunk);

                res.on('end', () => {
                    let Obj = {};
                    // console.log(data)
                    Obj.body = (data.length > 0) ? JSON.parse(data) : {};
                    Obj.statusCode = res.statusCode;                    
                    
                    switch(res.statusCode){
                        case 401 : 
                        case 409 : return reject({ statusCode: res.statusCode, message: Obj.body.error }); break;
                    }
                    return resolve(Obj);
                })
            });
            
            httpReq.on('error', (e) => {
                let err = {};
                switch(e.code){
                    case 'ECONNREFUSED': err.statusCode = 502; err.message = e.message; break;
                    default : err.statusCode = 500; err.message = e.message;
                }

                return reject(err);
            });
            
            httpReq.write(bodyData);
            httpReq.end();        
        });
    }
}

module.exports =  { DBHandler: CouchDBHandler };