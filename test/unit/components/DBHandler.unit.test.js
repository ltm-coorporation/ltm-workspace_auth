
let expect = require('chai').expect;
let { DBHandler } = require('../../../src/components/DBHandler');
let authObj = require('../../config/authDBUser');
let dbHandler = new DBHandler();
let createUser = require('../../config/createDBUser.test');
let deleteUser = require('../../config/deleteDBUser.test');



describe("=================== UNIT TESTS ========================", function(){
describe('-- DBHandler class methods --', function(){
    /**
     * Here creating and deleting user are tested in before and after respectively.
     */
    before('for db operations',function() {
        console.log(`-- before all test in ${__filename.slice(__dirname.length + 1)} file --` );
        return createUser();
    });
    after('for db operations',function() {
        console.log(`-- after all test in ${__filename.slice(__dirname.length + 1)} file --` );    
        return deleteUser();
    });
    let authObjModified = { username: authObj.username, password: 'password'};
    let authObjNew = { username: 'username', password: 'password' };
    
    describe('-- verify User() --', function(){
        function verify(authObj){
            return dbHandler.verifyDBUser(authObj)
        }

    
        describe('#for correct username and password of existing user.', function(){
            it('should return statusCode = 200 (Success)(OK)', function(){                
                return verify(authObj)
                .then(res => {                    
                    return expect(res.statusCode).to.equal(200); 
                });
            });
        });

        describe('#for incorrect username and password of existing user.', function(){
            it('should return statusCode == 401 (Client Error)(Unauthorized)', function(){
                return verify(authObjModified)
                .catch(res => {
                    return expect(res.statusCode).to.equal(401)
                });
            });
        });

        describe('#for non-existing user', function(){            
            it('should return statusCode == 401 (Client Error)(Unauthorized)', function(){
                return verify(authObjNew)
                .catch(res => {
                    return expect(res.statusCode).to.equal(401); 
                });
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
                .catch(res => {
                    return expect(res.statusCode).to.equal(401) 
                });
            });
        });

        describe('#for non-existing user', function(){            
            it('should return statusCode == 401 (Client Error)(Unauthorized)', function(){                
                return update(authObjNew)
                .catch(res => {
                    return expect(res.statusCode).to.equal(401)
                });
            });
        });
    });
});
});