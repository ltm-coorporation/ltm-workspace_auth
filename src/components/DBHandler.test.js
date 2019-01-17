
let expect = require('chai').expect;
let { DBHandler } = require('./DBHandler');

let authObj = {
    username: 'tesuser',
    password: 'testpassword'
};


before(function(done){
    let dbHandler = new DBHandler();
    
    dbHandler.createDBUser(authObj)
    .then(res => {
        expect(res.statusCode).to.equal(200);
        done();
    }).catch(err => done(err));
});

describe('DBHandler class methods', function(){
    describe('verify User()', function(){
        describe('#for correct username and password of existing user.', function(){
            it('should return statusCode = 200', function(done){


                let dbHandler = new DBHandler();
                dbHandler.verify(authObj)
                .then(res => {
                    expect(res.statusCode).to.equal(200);
                    done()
                })
                
                .catch(err => done(err));                
            });
        });

        describe('#for incorrect username and password of existing user.', function(){
            it('should return statusCode != 200', function(){

            })
        });

        describe('#for non-existing user', function(){
            
            it('should return statusCode != 200', function(){

            })
        })
        
        
    })
});