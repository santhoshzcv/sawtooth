const {prepareTransactions} = require('./prepareTransaction.js')

const {SubmitToServer} = require('./sumitToServer.js')

var args = process.argv;
var batchlistBytes=null;

if(args.length >2){
  var payload = JSON.parse(args[2])
  if(batchlistBytes=prepareTransactions(payload)){
  SubmitToServer(batchlistBytes);
  }
}
else 
console.log("Payload is empty. Run with payload")

