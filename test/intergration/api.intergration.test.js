
let chai = require('chai');
let expect = chai.expect;
let chaiHttp = require('chai-http');
let { DBHandler } = require('../../src/components/DBHandler');





let authObj = require('../config/authDBUser');
let dbHandler = new DBHandler();
let createUser = require('../config/createDBUser.test');
let deleteUser = require('../config/deleteDBUser.test');

chai.use(chaiHttp);
let app = require('../../src/app');
let requester = chai.request('https://ltm-workspace-auth.us-east.mybluemix.net')//.keepOpen();

describe("===================== INTEGRATION TESTS ====================", function(){
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

describe('-- Using GET request method to api --', function() {
    // before('', function(){ requester.keepOpen(); });
    // after('', function(){ requester.close(); }); // issue: https://github.com/chaijs/chai-http/issues/189
    it('shoud return statusCode = 405 (Client Error)(Method Not Allowed)', function(){
        return requester.get('/')
        .then(res => {
            expect(res.status).to.equal(405);
            expect(res.body.statusCode).to.equal(405);
        })
        .catch(err => {
            throw err;
        });
    });
});

describe('-- Using POST request method to api root--', function(){
    describe('#to route /', function(){
        
        it('return statusCode = 404 (Client Error)(Not Found)', function(){
            return requester.post('/')
            .then(res => {              
                expect(res.status).to.equal(404);
                expect(res.body.statusCode).to.equal(404);
            })
            .catch(err => {
                throw err;
            });
        });
    });
    describe('#to route /api', function(){        
        it('return statusCode = 404 (Client Error)(Not Found)', function(){
            return requester.post('/api')
            .then(res => {              
                expect(res.status).to.equal(404);
                expect(res.body.statusCode).to.equal(404);
            })
            .catch(err => {
                throw err;
            });
        });
    });
    describe('#to route /api/non-existing-route', function(){
        it('return statusCode = 404 (Client Error)(Not Found)', function(){
            return requester.post('/api/non-existing-route')
            .then(res => {              
                expect(res.status).to.equal(404);
                expect(res.body.statusCode).to.equal(404);
            })
            .catch(err => {
                throw err;
            });
        });
    });
});
describe('-- Using POST request to route: /api/user -- ', function(){
    
    describe('## without body', function(){
        describe('#to route /api/user', function(){        
            it('return statusCode = 400 (Client Error)(Bad Request)', function(){
                return requester.post('/api/user')
                .then(res => {              
                    expect(res.status).to.equal(400);
                    expect(res.body.statusCode).to.equal(400);
                })
                .catch(err => {
                    throw err;
                });
            });
        });

        describe('#to route /api/user/non-existing-route', function(){
            it('return statusCode = 400 (Client Error)(Bad Request)', function(){
                return requester.post('/api/user/non-existing-route')
                .then(res => {              
                    expect(res.status).to.equal(400);
                    expect(res.body.statusCode).to.equal(400);
                })
                .catch(err => {
                    throw err;
                });
            });
        });
        describe('#to route /api/user/create', function(){
            it('return statusCode = 400 (Client Error)(Bad Request)', function(){
                return requester.post('/api/user/create')
                .then(res => {              
                    expect(res.status).to.equal(400);
                    expect(res.body.statusCode).to.equal(400);
                })
                .catch(err => {
                    throw err;
                });
            });
        });
        describe('#to route /api/user/update', function(){
            it('return statusCode = 400 (Client Error)(Bad Request)', function(){
                return requester.post('/api/user/update')
                .then(res => {              
                    expect(res.status).to.equal(400);
                    expect(res.body.statusCode).to.equal(400);
                })
                .catch(err => {
                    throw err;
                });
            });
        });
        describe('#to route /api/user/info', function(){
            it('return statusCode = 400 (Client Error)(Bad Request)', function(){
                return requester.post('/api/user/info')
                .then(res => {              
                    expect(res.status).to.equal(400);
                    expect(res.body.statusCode).to.equal(400);
                })
                .catch(err => {
                    throw err;
                });
            });
        });
        describe('#to route /api/user/verify', function(){
            it('return statusCode = 400 (Client Error)(Bad Request)', function(){
                return requester.post('/api/user/verify')
                .then(res => {              
                    expect(res.status).to.equal(400);
                    expect(res.body.statusCode).to.equal(400);
                })
                .catch(err => {
                    throw err;
                });
            });
        });
    });
    describe('## with body and without both username and password fields', function(){
        describe('#to route /api/user', function(){        
            it('return statusCode = 403 (Client Error)(Forbidden)', function(){
                return requester.post('/api/user')
                .type('form')
                .send({"any":"any"})
                .then(res => {              
                    expect(res.status).to.equal(403);
                    expect(res.body.statusCode).to.equal(403);
                })
                .catch(err => {
                    throw err;
                });
            });
        });

        describe('#to route /api/user/non-existing-route', function(){
            it('return statusCode = 403 (Client Error)(Forbidden)', function(){
                return requester.post('/api/user/non-existing-route')
                .type('form')
                .send({"any":"any"})
                .then(res => {              
                    expect(res.status).to.equal(403);
                    expect(res.body.statusCode).to.equal(403);
                })
                .catch(err => {
                    throw err;
                });
            });
        });
        describe('#to route /api/user/create', function(){
            it('return statusCode = 403 (Client Error)(Forbidden)', function(){
                return requester.post('/api/user/create')
                .type('form')
                .send({"any":"any"})
                .then(res => {              
                    expect(res.status).to.equal(403);
                    expect(res.body.statusCode).to.equal(403);
                })
                .catch(err => {
                    throw err;
                });
            });
        });
        describe('#to route /api/user/update', function(){
            it('return statusCode = 403 (Client Error)(Forbidden)', function(){
                return requester.post('/api/user/update')
                .type('form')
                .send({"any":"any"})
                .then(res => {              
                    expect(res.status).to.equal(403);
                    expect(res.body.statusCode).to.equal(403);
                })
                .catch(err => {
                    throw err;
                });
            });
        });
        describe('#to route /api/user/info', function(){
            it('return statusCode = 403 (Client Error)(Forbidden)', function(){
                return requester.post('/api/user/info')
                .type('form')
                .send({"any":"any"})
                .then(res => {              
                    expect(res.status).to.equal(403);
                    expect(res.body.statusCode).to.equal(403);
                })
                .catch(err => {
                    throw err;
                });
            });
        });
        describe('#to route /api/user/verify', function(){
            it('return statusCode = 403 (Client Error)(Forbidden)', function(){
                return requester.post('/api/user/verify')
                .type('form')
                .send({"any":"any"})
                .then(res => {              
                    expect(res.status).to.equal(403);
                    expect(res.body.statusCode).to.equal(403);
                })
                .catch(err => {
                    throw err;
                });
            });
        });
    });
    describe('## with body and with both username and password fields (of existing user)', function(){
        authObj.any = "any";
        describe('#to route /api/user', function(){        
            it('return statusCode = 404 (Client Error)(Not Found)', function(){
                return requester.post('/api/user')
                .type('form')
                .send(authObj)
                .then(res => {              
                    expect(res.status).to.equal(404);
                    expect(res.body.statusCode).to.equal(404);
                })
                .catch(err => {
                    throw err;
                });
            });
        });

        describe('#to route /api/user/non-existing-route', function(){
            it('return statusCode = 404 (Client Error)(Not Found)', function(){
                return requester.post('/api/user/non-existing-route')
                .type('form')
                .send(authObj)
                .then(res => {              
                    expect(res.status).to.equal(404);
                    expect(res.body.statusCode).to.equal(404);
                })
                .catch(err => {
                    throw err;
                });
            });
        });
        describe('#to route /api/user/create', function(){
            it('return statusCode = 201 (Success)(Created)', function(){
                return requester.post('/api/user/create')
                .type('form')
                .send(authObj)
                .then(res => {              
                    expect(res.status).to.equal(201);
                    expect(res.body.statusCode).to.equal(201);
                })
                .catch(err => {
                    throw err;
                });
            });
        });
        describe('#to route /api/user/update', function(){
            it('return statusCode = 201 (Success)(Created)', function(){
                return requester.post('/api/user/update')
                .type('form')
                .send(authObj)
                .then(res => {              
                    expect(res.status).to.equal(201);
                    expect(res.body.statusCode).to.equal(201);
                })
                .catch(err => {
                    throw err;
                });
            });
        });
        describe('#to route /api/user/info', function(){
            it('return statusCode = 200 (Success)(Ok)', function(){
                return requester.post('/api/user/info')
                .type('form')
                .send(authObj)
                .then(res => {              
                    expect(res.status).to.equal(200);
                    expect(res.body.statusCode).to.equal(200);
                })
                .catch(err => {
                    throw err;
                });
            });
        });
        describe('#to route /api/user/verify', function(){
            it('return statusCode = 200 (Success)(Ok)', function(){
                return requester.post('/api/user/verify')
                .type('form')
                .send(authObj)
                .then(res => {              
                    expect(res.status).to.equal(200);
                    expect(res.body.statusCode).to.equal(200);
                })
                .catch(err => {
                    throw err;
                });
            });
        });
    });
});
});