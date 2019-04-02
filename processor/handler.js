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
    console.log(payload);
    let simpleStoreState = new SimpleStoreState(context);

    if (payload.action === 'get') {
      return simpleStoreState.getValue(payload.data)
    } else if (payload.action === 'set') {
      console.log(payload.action);
      return simpleStoreState.setValue(payload.data)
    } else {
      throw new InvalidTransaction(
        `Action must be create, delete, or take not ${payload.action}`
      )
    }
  }

}

module.exports = SimpleStoreHandler;