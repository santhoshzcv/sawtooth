const env = require('../shared/env');
var { _hashforpayload } = require("../shared/Addressing.js");
const cbor = require('cbor')
const { protobuf } = require('sawtooth-sdk')
const  keyManager  = require('./keymanager');


function prepareTransactions(payload,keyManager ) {
  const payloadBytes = cbor.encode(payload)
  const transactionHeaderBytes = protobuf.TransactionHeader.encode({
    familyName: env.familyName,
    familyVersion: env.familyVersion,
    inputs: ['917479'],
    outputs: ['917479'],
    signerPublicKey: keyManager.readpublickey("santhosh"),
    batcherPublicKey: keyManager.readpublickey("santhosh"),
    dependencies: [],
    payloadSha512: _hashforpayload(payloadBytes),
    nonce: (new Date()).toString()
  }).finish()
   
  
  
  const signature = keyManager.sign(transactionHeaderBytes);
  // const signature = signer.sign(transactionHeaderBytes)

  const transaction = protobuf.Transaction.create({
    header: transactionHeaderBytes,
    headerSignature: signature,
    payload: payloadBytes
  })

  const transactions = [transaction]

  const batchHeaderBytes = protobuf.BatchHeader.encode({
    signerPublicKey:keyManager.readpublickey("santhosh"),
    transactionIds: transactions.map((txn) => txn.headerSignature),
  }).finish()

  headerSignature = keyManager.sign(batchHeaderBytes);

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




