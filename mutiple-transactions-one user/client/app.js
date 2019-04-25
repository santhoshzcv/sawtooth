
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
    var payload1 = JSON.parse(args[3]);
    var payload2 = JSON.parse(args[4]);
    var username = args[2];
    if(keyManager.doesKeyExist(username)){
        console.log("keys are already created for"+username);
    
    }else{
        var output = keyManager.createkeys(username);
        keyManager.savekeys(username,output);
    }
    console.log(username)
    if(keyManager.doesKeyExist(username)){
        if(batchlistBytes=prepareTransactions(payload1,payload2,username)){
        SubmitToServer(batchlistBytes);
        }
    }
}
else 
console.log("Payload is empty. Run with payload")

