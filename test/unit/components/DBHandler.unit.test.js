
let expect = require('chai').expect;
let { DBHandler } = require('../../../src/components/DBHandler');

let authObj = {
    username: 'tesuser',
    password: 'testpassword'
};


before('for db operations',function() {
    // this.timeout(3000);
    console.log('-- before all test in this file -- ');
    it('created test db user with return statusCode == 201', function(){
        let dbHandler = new DBHandler();
        return dbHandler.createDBUser(authObj)
        .then(res => expect(res.statusCode).to.equal(201));
    })    
});




after('for db operations',function() {    
    // this.timeout(3000);
    console.log('-- after all test in this file -- ');
    // it('deleted test db user with return statusCode == 200', function(){
        let dbHandler = new DBHandler();
        return dbHandler.deleteDBUser(authObj)
            .then(res => expect(res.statusCode).to.equal(200));
    // })
});

describe('-- DBHandler class methods --', function(){
    before(' -- deleting tes user --', function(){ 
        expect(2).to.equal(2);
    });

    
    describe('verify User()', function(){
        
        describe('#for correct username and password of existing user.', function(){
            it('should return statusCode = 200', function(){
                let dbHandler = new DBHandler();
                return dbHandler.verify(authObj)
                .then(res => expect(res.statusCode).to.equal(200));                
            });
        });

        // describe.skip('#for incorrect username and password of existing user.', function(){
        //     it('should return statusCode != 200', function(){

        //     })
        // });

        // describe.skip('#for non-existing user', function(){
            
        //     it('should return statusCode != 200', function(){

        //     })
        // })
    })
});