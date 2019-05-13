const { TransactionHandler } = require('sawtooth-sdk/processor/handler')
const { InvalidTransaction, InternalError } = require('sawtooth-sdk/processor/exceptions')

const cbor = require('cbor')
const env = require('../shared/env');
const SimpleStoreState = require('./state');


class SimpleStoreHandler extends TransactionHandler {

  constructor() {
    super(env.familyName, [env.familyVersion], [env.TP_NAMESPACE])
  }

  apply(transactionProcessRequest, context) {
    let payload = cbor.decode(transactionProcessRequest.payload);
    let header = transactionProcessRequest.header
    let signer_public_key = header.signerPublicKey;
    console.log(payload);
    console.log("publickey"+signer_public_key);
    let simpleStoreState = new SimpleStoreState(context);

    if (payload.action === 'get') {
      return simpleStoreState.getValue(payload.data)
    } else if (payload.action === 'set') {
      console.log(payload.action);
     simpleStoreState.setValue(payload.data)

    let name="santhosh";
     context.addEvent(
        'simplestore/set',
        [['name', name], ['creator', signer_public_key]],
        null
        ).then(function (result) {
          console.log("Success", result)
          
        }).catch(function (error) {
          console.error("Error", error)
        })

    } else {
      throw new InvalidTransaction(
        `Action must be create, delete, or take not ${payload.action}`
      )
    }
   }

}

module.exports = SimpleStoreHandler;