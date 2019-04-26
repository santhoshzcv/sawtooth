
const env = require('../shared/env');
var { _hashforpayload } = require("../shared/Addressing");
const cbor = require('cbor')
const { protobuf } = require('sawtooth-sdk')
const  KeyManager = require('./keymanager');

function prepareTransaction(payload, username){

    var keyManager = new KeyManager();
    var tempUserPublicKey = keyManager.readpublickey(username)
    const payloadBytes = cbor.encode(payload);
    const transactionHeaderBytes = protobuf.TransactionHeader.encode({
    familyName: env.familyName,
    familyVersion: env.familyVersion,
    inputs: ['b14deb'],
    outputs: ['b14deb'],
     signerPublicKey: tempUserPublicKey,
     batcherPublicKey: tempUserPublicKey,
    dependencies: [],
    payloadSha512: _hashforpayload(payloadBytes),
    nonce: (new Date()).toString()
  }).finish()

  const signature = keyManager.sign(transactionHeaderBytes,username);

  const transaction= protobuf.Transaction.create({
    header: transactionHeaderBytes,
    headerSignature: signature,
    payload: payloadBytes
  })
  return transaction
}

module.exports = { prepareTransaction };