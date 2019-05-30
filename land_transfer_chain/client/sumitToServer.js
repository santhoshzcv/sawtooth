const env = require('../shared/env');
const request = require('request');

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

getAllData =()=>{
  let API_URL='http://localhost:8008';
  let PREFIX = '697ed8';
 request.get({
    url: `${API_URL}/state?address=${PREFIX}`
  }, (err, response) => {
    if (err) return  console.log(err)
    let length = JSON.parse(response.body).data.length;
    for(i=0;i<length;i++){
      console.log(JSON.parse(response.body).data[i].address);
     if(JSON.parse(response.body).data[i].address[6] === '2'){
    var buffer = new Buffer(JSON.parse(response.body).data[i].data, 'base64');
    var string = buffer.toString();
    console.log(string)
     }
    }
    
  })
}


module.exports = { SubmitToServer,getAllData }

