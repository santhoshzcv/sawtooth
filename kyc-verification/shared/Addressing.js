const { createHash } = require('crypto')
const env = require('../shared/env');

_hash1=(x)=>{
  return createHash('sha512').update(x).digest('hex').toLowerCase().substring(0, 62);
  }

_hashforpayload=(x) =>{
  return createHash('sha512').update(x).digest('hex');
}

const prefix = {
  upload: '00',
  kyc: '01'
}

get_uploader_address=(customer_id)=>{
  let TP_NAMESPACE=createHash('sha512').update('investor').digest('hex').toLowerCase().substring(0, 64).substring(0,6)
  console.log("namespace"+TP_NAMESPACE);
  return TP_NAMESPACE + prefix.upload + _hash1(customer_id)
}

get_kyc_address=(customer_id)=>{
  let TP_NAMESPACE=createHash('sha512').update('investor').digest('hex').toLowerCase().substring(0, 64).substring(0,6)
  console.log("namespace"+TP_NAMESPACE);
  return TP_NAMESPACE + prefix.kyc + _hash1(customer_id)
}



module.exports={_hash1,_hashforpayload,get_uploader_address,get_kyc_address}