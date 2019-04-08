 const {prepareTransactions} = require('./prepareTransaction.js')
const {SubmitToServer} = require('./sumitToServer.js')
const  KeyManager = require('./keymanager');

var args = process.argv;
var batchlistBytes=null;
var keyManager = new KeyManager();
var payload = JSON.parse(args[2])
if(keyManager.doesKeyExist(payload.username)){
    console.log("keys are already created for"+"santhosh");
}else{
    var output = keyManager.createkeys("santhosh")
    var text="SAWTOOTH";
    keyManager.savekeys(payload.username,output)
    console.log("sucess")
    console.log(keyManager.readpublickey("santhosh"))
    console.log(keyManager.sign(text));
}

// if(args.length >2){
//    var payload = JSON.parse(args[2])
//       //  batchlistBytes=prepareTransactions(payload,keyManager)
//       //  console.log(batchlistBytes)
//   // if(batchlistBytes=prepareTransactions(payload,publickey,signer)){
//   // SubmitToServer(batchlistBytes);
//   }

// else 
// console.log("Payload is empty. Run with payload")

