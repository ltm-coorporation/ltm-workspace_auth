
class ApiKeyBuilder {

    constructor(){}

    validate(apiKey){
        let keyValid = true;


     
        return new Promise((resolve, reject) => {
            if(keyValid) return resolve(apiKey);

            return reject();
        });
    }

    
    generate(){
        return new Promise((resolve, reject) => resolve('NewKEy'));
    }
}

module.exports = { ApiKeyBuilder };