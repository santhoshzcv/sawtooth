var { _hash1 } = require("../shared/Addressing.js");
const { createHash } = require('crypto')
const env = {
    privateKey: process.env.PRIVATE_KEY || '',
    publicKey: process.env.PUBLIC_KEY || '',
    restApiUrl: process.env.REST_API_URL || 'http://localhost:8008',
    familyName: 'simplestore',
    familyVersion: '1.0',
    urlToPost:'http://localhost:8008/batches',
    urlToGet:'http://localhost:8008/state/91747910b1f715903929b1819117810ad3f41ada4a545bb4dcc1666f5f1074c31b430d',
    TP_NAMESPACE:createHash('sha512').update('simplestore').digest('hex').toLowerCase().substring(0, 64).substring(0,6)
  }
  
  module.exports = env