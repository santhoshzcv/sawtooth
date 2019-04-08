const { createHash } = require('crypto')
const env = require('./env');
_hash1=(x)=>{
  return createHash('sha512').update(x).digest('hex').toLowerCase().substring(0, 64);
  }

_hashforpayload=(x) =>{
  return createHash('sha512').update(x).digest('hex');
}

makeAddress = (x,TP_NAMESPACE) => {
   return TP_NAMESPACE +_hash1(x);
}

module.exports={makeAddress,_hash1,_hashforpayload}