
const {prepareTransactions} = require('./prepareTransaction')
const {SubmitToServer} = require('./sumitToServer.js')
 const  KeyManager = require('./keymanager');
 const env = require('../shared/env');

var args = process.argv;
var batchlistBytes=null;
var keyManager = new KeyManager();

 if(args.length >2){


     if(keyManager.doesKeyExist(env.familyName)){
        console.log("keys are already created for"+env.familyName);
    
    }else{
        var output = keyManager.createkeys(env.familyName);
        keyManager.savekeys(env.familyName,output);
    }

    var username1 = args[2];
    var payload1 = JSON.parse(args[3]);

    var username2 = args[4];
    var payload2 = JSON.parse(args[5]);
    
    

    if(keyManager.doesKeyExist(username1)){
        console.log("keys are already created for"+username1);
    
    }else{
        var output = keyManager.createkeys(username1);
        keyManager.savekeys(username1,output);
    }

    if(keyManager.doesKeyExist(username2)){
        console.log("keys are already created for"+username1);
    
    }else{
        var output = keyManager.createkeys(username2);
        keyManager.savekeys(username2,output);
    }

    if(keyManager.doesKeyExist(username1)){
        if(keyManager.doesKeyExist(username2)){

        if(batchlistBytes=prepareTransactions(username1,payload1,username2,payload2)){
        SubmitToServer(batchlistBytes);
        }
    }
    }
}
else 
console.log("Payload is empty. Run with payload")

