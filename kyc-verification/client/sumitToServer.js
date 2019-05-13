const env = require('../shared/env');
const request = require('request');
const {get_kyc_address} =require('../shared/Addressing');
const atob = require('atob');

SubmitToServer = (batchListBytes) => {
  request.post({
    url: env.urlToPost,
    body: batchListBytes,
    headers: { 'Content-Type': 'application/octet-stream' }
  }, (err, response) => {
    if (err) return console.log(err);
    console.log(response.body);
  })

}

getVerifiedState = (id) =>{
  let address = get_kyc_address(id);
 console.log(address);
 request.get({
  url: `${env.API_URL}/state?address=${address}`
 }, (err, response) => {
  if (err) return  console.log(err)
  if(JSON.parse(response.body).data[0] == null){
    console.log("kyc data is not verified");
  }else{
    var buffer = new Buffer(JSON.parse(response.body).data[0].data, 'base64');
    var string = buffer.toString();
    console.log(string);
  }
  })

 }



module.exports = { SubmitToServer,getVerifiedState}

