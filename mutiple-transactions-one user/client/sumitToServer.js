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
    console.log(response);
  })

}

module.exports = { SubmitToServer }

