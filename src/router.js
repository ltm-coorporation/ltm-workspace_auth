
let UserRoutes = require('./routes/user');
let SyncDataRoutes = require('./routes/syncData');
function router(req, res){
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Headers", "POST");

    
    let promise = new Promise((resolve ,reject) => {


        let err = {}
        // only post method is accepted.
        if(req.method != 'POST') {            
            err.statusCode = 405;
            err.message = 'Send requests using POST.';
            return reject(err);
        } else {
    
            let routeTo  = req.url.split("/")[2];
            // let routeToMethod = req.url.split("/")[3];
            switch(routeTo){                
                case 'user'  : return UserRoutes(req, res).then(doc => resolve(doc)).catch(err => reject(err)); break;
            
                case 'sync'  : return SyncDataRoutes(req, res).then(doc => resolve(doc)).catch(err => reject(err)); break;
                default : { err.message = 'Contact Docs for existing routes.';
                            err.statusCode = 404;
                            return reject(err);
                          }
            }
        }
    });


    promise
    .then(resObj => {
        res.statusCode = resObj.statusCode || 200;
        res.write(JSON.stringify(resObj));
    })
    .catch(err => {
        // console.log(err);
        err.status = 'Error Occured';
        res.statusCode = err.statusCode || 500;
        res.write(JSON.stringify(err));
    })
    .then(_ => {        
        res.end()
    });
}

module.exports = router;