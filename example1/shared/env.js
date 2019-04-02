var { _hash1 } = require("../shared/Addressing.js");

const env = {
    privateKey: process.env.PRIVATE_KEY || '',
    publicKey: process.env.PUBLIC_KEY || '',
    restApiUrl: process.env.REST_API_URL || 'http://localhost:8008',
    familyName: 'simplestore',
    familyVersion: '1.0',
    urlToPost:'http://localhost:8008/batches',
    TP_NAMESPACE:_hash1('simplestore').substring(0,6)
  }
  
  module.exports = env