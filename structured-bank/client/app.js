
const {prepareTransactions} = require('./prepareTransaction')
const {SubmitToServer} = require('./sumitToServer.js')
 const  KeyManager = require('./keymanager');

var args = process.argv;
var batchlistBytes=null;
var keyManager = new KeyManager();

 if(args.length >2){
    var payload = JSON.parse(args[3])
    var username = args[2];
    if(keyManager.doesKeyExist(username)){
        console.log("keys are already created for"+username);
    
    }else{
        var output = keyManager.createkeys(username);
        keyManager.savekeys(username,output);
    }
    console.log(username)
    console.log(payload);
    if(keyManager.doesKeyExist(username)){
        if(batchlistBytes=prepareTransactions(payload,username)){
        SubmitToServer(batchlistBytes);
        }
    }
}
else 
console.log("Payload is empty. Run with payload")

