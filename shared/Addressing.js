const { createHash } = require('crypto')

_hash1=(x)=>{
  return createHash('sha512').update(x).digest('hex').toLowerCase().substring(0, 64);
  }

_hashforpayload=(x) =>{
  return createHash('sha512').update(x).digest('hex');
}

makeAddress = (x) => {
   const TP_FAMILY = 'simplestore';
   TP_NAMESPACE = _hash1(TP_FAMILY).substring(0, 6);
   return TP_NAMESPACE +_hash1(x);
}

module.exports={makeAddress,_hash1,_hashforpayload}