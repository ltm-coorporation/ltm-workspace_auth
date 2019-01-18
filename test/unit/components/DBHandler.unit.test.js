
let expect = require('chai').expect;
let { DBHandler } = require('../../../src/components/DBHandler');

let authObj = {
    username: 'tesuser',
    password: 'testpassword'
};


before('for db operations',function() {
    // this.timeout(3000);
    console.log(`-- before all test in ${__filename.slice(__dirname.length + 1)} file --` );
    it('created test db user with return statusCode == 201', function(){
        let dbHandler = new DBHandler();
        return dbHandler.createDBUser(authObj)
        .then(res => expect(res.statusCode).to.equal(201));
    })    
});




after('for db operations',function() {    
    // this.timeout(3000);
    console.log(`-- after all test in ${__filename.slice(__dirname.length + 1)} file --` );
    // it('deleted test db user with return statusCode == 200', function(){
        let dbHandler = new DBHandler();
        return dbHandler.deleteDBUser(authObj)
            .then(res => expect(res.statusCode).to.equal(200));
    // })
});

describe('-- DBHandler class methods --', function(){    
    describe('-- verify User() --', function(){        
        describe('#for correct username and password of existing user.', function(){
            it('should return statusCode = 200 (Success)', function(){
                let dbHandler = new DBHandler();
                return dbHandler.verify(authObj)
                .then(res => expect(res.statusCode).to.equal(200));                
            });
        });

        describe('#for incorrect username and password of existing user.', function(){
            it('should return statusCode == 401 (Unauthorized)', function(){
                let authObjTemp = { username: authObj.username, password: 'password'};
                let dbHandler = new DBHandler();
                return dbHandler.verify(authObjTemp)
                .then(res => expect(res.statusCode).to.equal(401));
            });
        });

        describe('#for non-existing user', function(){            
            it('should return statusCode == 401 (Unauthorized)', function(){
                let authObjTemp = { username: 'username', password: 'password' };
                let dbHandler = new DBHandler();
                return dbHandler.verify(authObjTemp)
                .then(res => expect(res.statusCode).to.equal(401));
            });
        });
    });
});