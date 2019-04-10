# sawtooth
sawtooth example for setting and getting data 

1. start the validator
   
   docker-compose -f sawtooth-default.yaml up

2. Run  Processor

  -> node index.js

3. Run client
   
   -> node app.js  'username' '{"action":"set","data":"apple"}'

   username->  to generate  privatekey and publickey for that user.