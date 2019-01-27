

let { ApiKeyBuilder } = require('../components/ApiKeyBuilder');
let DBRequestHandler = require('../components/DBHandler');

class SyncAuth {
    
    constructor(){}

    
    getKey(){
        
        let apiKey = 'fetchedFromDb';
        let apiKeyBuilder = new ApiKeyBuilder();
        // return new Promise((resolve, reject) => resolve(apiKey));
        return apiKeyBuilder.validate(apiKey)                
                .catch(err => apiKeyBuilder.generate())
                .then(key => key);
    }
}

module.exports = { SyncAuth };