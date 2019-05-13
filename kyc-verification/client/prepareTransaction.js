const env = require('../shared/env');
var { _hashforpayload } = require("../shared/Addressing");
const cbor = require('cbor')
const { protobuf } = require('sawtooth-sdk')
const  KeyManager = require('./keymanager');

function prepareTransactions(payload,username) {

  var keyManager = new KeyManager();
  var tempUserPublicKey = keyManager.readpublickey(username) 
  const payloadBytes = cbor.encode(payload)
  const transactionHeaderBytes = protobuf.TransactionHeader.encode({
    familyName: env.familyName,
    familyVersion: env.familyVersion,
    inputs: [env.TP_NAMESPACE],
    outputs: [env.TP_NAMESPACE],
     signerPublicKey: tempUserPublicKey,
     batcherPublicKey: tempUserPublicKey,
    dependencies: [],
    payloadSha512: _hashforpayload(payloadBytes),
    nonce: (new Date()).toString()
  }).finish()
   
  
  
  const signature = keyManager.sign(transactionHeaderBytes,username);

  const transaction = protobuf.Transaction.create({
    header: transactionHeaderBytes,
    headerSignature: signature,
    payload: payloadBytes
  })

  const transactions = [transaction]

  const batchHeaderBytes = protobuf.BatchHeader.encode({
  signerPublicKey:tempUserPublicKey,
  transactionIds: transactions.map((txn) => txn.headerSignature),
  }).finish()

  headerSignature = keyManager.sign(batchHeaderBytes,username);

  const batch = protobuf.Batch.create({
    header: batchHeaderBytes,
    headerSignature: headerSignature,
    transactions: transactions
  })

  const batchListBytes = protobuf.BatchList.encode({
    batches: [batch]
  }).finish()

  return batchListBytes;
}

 module.exports = { prepareTransactions };




