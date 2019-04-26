const env = require('../shared/env');
var { _hashforpayload } = require("../shared/Addressing");
const cbor = require('cbor')
const { protobuf } = require('sawtooth-sdk')
const  KeyManager = require('./keymanager');


function prepareTransactions(username1,payload1,username2,payload2) { 

  var keyManager = new KeyManager();

  var tempUserPublicKey1 = keyManager.readpublickey(username1);
  
  
  var tempUserPublicKey2 = keyManager.readpublickey(username2);

  var applicationPublicKey = keyManager.readpublickey(env.familyName)

  const payloadBytes1 = cbor.encode(payload1)
  const transactionHeaderBytes1 = protobuf.TransactionHeader.encode({
    familyName: env.familyName,
    familyVersion: env.familyVersion,
    inputs: ['b14deb'],
    outputs: ['b14deb'],
     signerPublicKey: tempUserPublicKey1,
     batcherPublicKey: applicationPublicKey,
    dependencies: [],
    payloadSha512: _hashforpayload(payloadBytes1),
    nonce: (new Date()).toString()
  }).finish()

  const transactionHeaderSignature = keyManager.sign(transactionHeaderBytes1,username1);

  const transaction1= protobuf.Transaction.create({
    header: transactionHeaderBytes1,
    headerSignature: transactionHeaderSignature,
    payload: payloadBytes1
  })


  const payloadBytes2 = cbor.encode(payload2)
  const transactionHeaderBytes2 = protobuf.TransactionHeader.encode({
    familyName: env.familyName,
    familyVersion: env.familyVersion,
    inputs: ['b14deb'],
    outputs: ['b14deb'],
     signerPublicKey: tempUserPublicKey2,
     batcherPublicKey: applicationPublicKey,
    dependencies: [],
    payloadSha512: _hashforpayload(payloadBytes2),
    nonce: (new Date()).toString()
  }).finish()

  const transactionHeaderSignature2 = keyManager.sign(transactionHeaderBytes2,username2);

  const transaction2= protobuf.Transaction.create({
    header: transactionHeaderBytes2,
    headerSignature: transactionHeaderSignature2,
    payload: payloadBytes2
  })
   
  const transactions = [transaction1,transaction2]

  const batchHeaderBytes = protobuf.BatchHeader.encode({
  signerPublicKey:applicationPublicKey,
  transactionIds: transactions.map((txn) => txn.headerSignature),
  }).finish()

  batchheaderSignature = keyManager.sign(batchHeaderBytes,env.familyName);

  const batch = protobuf.Batch.create({
    header: batchHeaderBytes,
    headerSignature: batchheaderSignature,
    transactions: transactions
  })

  const batchListBytes = protobuf.BatchList.encode({
    batches: [batch]
  }).finish()

  return batchListBytes;
}

 module.exports = { prepareTransactions };

