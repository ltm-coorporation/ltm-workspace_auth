
let expect = require('chai').expect;
let { DBHandler } = require('../../../src/components/DBHandler');
let dbHandler = new DBHandler();
let authObj = { username: 'tesuser', password: 'testpassword' };





/**
 * Here creating and deleting user are tested in before and after respectively.
 */
before('for db operations',function() {
    // this.timeout(3000);
    console.log(`-- before all test in ${__filename.slice(__dirname.length + 1)} file --` );
    // it('created test db user with return statusCode == 201 (Success)(Created)', function(){
        
        return dbHandler.createDBUser(authObj)
        .then(res => {
            return expect(res.statusCode).to.equal(201);
        });

    // });
});

after('for db operations',function() {    
    console.log(`-- after all test in ${__filename.slice(__dirname.length + 1)} file --` );
    // it('deleted test db user with return statusCode == 200 (Success)(OK)', function(){
        return dbHandler.deleteDBUser(authObj)
        .then(res => {
            
            return expect(res.statusCode).to.equal(200);
        });
    // });
});


describe('-- DBHandler class methods --', function(){
    
    let authObjModified = { username: authObj.username, password: 'password'};
    let authObjNew = { username: 'username', password: 'password' };


    describe('-- verify User() --', function(){
        function verify(authObj){
            return dbHandler.verifyDBUser(authObj)
        }

        describe('#for correct username and password of existing user.', function(){
            it('should return statusCode = 200 (Success)(OK)', function(){                
                return verify(authObj)
                .then(res => expect(res.statusCode).to.equal(200));                
            });
        });

        describe('#for incorrect username and password of existing user.', function(){
            it('should return statusCode == 401 (Client Error)(Unauthorized)', function(){
                return verify(authObjModified)
                .then(res => expect(res.statusCode).to.equal(401));
            });
        });

        describe('#for non-existing user', function(){            
            it('should return statusCode == 401 (Client Error)(Unauthorized)', function(){
                return verify(authObjNew)
                .then(res => expect(res.statusCode).to.equal(401));
            });
        });
    });

    describe('-- update User() --', function(){
        function update(authObj){
            return dbHandler.updateDBUser(authObj)
        }

        
        
        
        describe('#for correct username and password of existing user.', function(){
            it('should return statusCode = 201 (Success)(Created)', function(){
                return update(authObj)
                .then(res => {
                    return expect(res.statusCode).to.equal(201);
                });
            });
        });

        
        
        
        describe('#for incorrect username and password of existing user.', function(){
            it('should return statusCode == 401 (Client Error)(Unauthorized)', function(){
                return update(authObjModified)
                .then(res => {
                    return expect(res.statusCode).to.equal(401) 
                });
            });
        });

        describe('#for non-existing user', function(){            
            it('should return statusCode == 401 (Client Error)(Unauthorized)', function(){
                
                return update(authObjNew)
                .then(res => {
                    return expect(res.statusCode).to.equal(401)
                });
            });
        });
    });
});