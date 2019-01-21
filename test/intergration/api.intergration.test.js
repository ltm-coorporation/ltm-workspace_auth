
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
let requester = chai.request(app).keepOpen();

describe("===================== INTEGRATION TESTS ====================", function(){
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

describe('-- Using POST request method to api --', function(){
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
});
});