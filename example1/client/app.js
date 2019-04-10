 const {prepareTransactions} = require('./prepareTransaction.js')
const {SubmitToServer} = require('./sumitToServer.js')
 const  KeyManager = require('./keymanager');

var args = process.argv;
var batchlistBytes=null;

// var payload = args[2]
// else{
//     
//     var text="SAWTOOTH";
//     
//     console.log("sucess")
//     console.log(keyManager.readpublickey("santhosh"))
//     console.log(keyManager.sign(text));
// }
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

