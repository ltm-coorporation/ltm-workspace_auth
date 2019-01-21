
let expect = require('chai').expect;
let { DBHandler } = require('../../src/components/DBHandler');
let authObj = require('./authDBUser');



            
    

module.exports = () => {
    let dbHandler = new DBHandler();
    return dbHandler.createDBUser(authObj)
        .then(res => {
            return expect(res.statusCode).to.equal(201);
        });
}