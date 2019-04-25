
const { TransactionProcessor } = require('sawtooth-sdk/processor')

const SmallBankHandler = require('./handler')
const env = require('../shared/env')

const transactionProcessor = new TransactionProcessor(env.validatorUrl)

transactionProcessor.addHandler(new SmallBankHandler())
transactionProcessor.start()

console.log(`Starting SupplyChainHandler processor`)
console.log(`Connecting to Sawtooth validator at ${env.validatorUrl}`)
