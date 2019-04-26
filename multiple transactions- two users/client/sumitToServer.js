const env = require('../shared/env');
const request = require('request');

SubmitToServer = (batchListBytes) => {
  request.post({
    url: env.urlToPost,
    body: batchListBytes,
    headers: { 'Content-Type': 'application/octet-stream' }
  }, (err, response) => {
    if (err) return console.log(err);
    console.log((JSON.parse(response.body)).link);
   
    console.log("statusCode:"+response.statusCode,"Message:"+response.statusMessage);
      if(response.statusCode == 202){
        request.get({
          url: (JSON.parse(response.body)).link,
          headers: { 'Content-Type': 'application/octet-stream' }
        }, (err, response) => {
          let data;
          if (err) return console.log(err)
          console.log(response.body);
          // data =JSON.parse(response.body); 
          // console.log(data.data[0].header.transaction_ids);
        })
      }
  })
}



module.exports = { SubmitToServer }

