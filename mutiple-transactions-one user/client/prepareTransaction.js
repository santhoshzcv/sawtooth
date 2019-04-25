const env = require('../shared/env');
var { _hashforpayload } = require("../shared/Addressing");
const cbor = require('cbor')
const { protobuf } = require('sawtooth-sdk')
const  KeyManager = require('./keymanager');


function prepareTransactions(payload1,payload2,username) { 
  var keyManager = new KeyManager();
  var tempUserPublicKey = keyManager.readpublickey(username) 
  var applicationPublicKey = keyManager.readpublickey(env.familyName)

  const payloadBytes1 = cbor.encode(payload1)
  const transactionHeaderBytes1 = protobuf.TransactionHeader.encode({
    familyName: env.familyName,
    familyVersion: env.familyVersion,
    inputs: ['b14deb'],
    outputs: ['b14deb'],
     signerPublicKey: tempUserPublicKey,
     batcherPublicKey: applicationPublicKey,
    dependencies: [],
    payloadSha512: _hashforpayload(payloadBytes1),
    nonce: (new Date()).toString()
  }).finish()

  const transactionHeaderSignature = keyManager.sign(transactionHeaderBytes1,username);

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
     signerPublicKey: tempUserPublicKey,
     batcherPublicKey: applicationPublicKey,
    dependencies: [],
    payloadSha512: _hashforpayload(payloadBytes2),
    nonce: (new Date()).toString()
  }).finish()

  const transactionHeaderSignature2 = keyManager.sign(transactionHeaderBytes2,username);

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

