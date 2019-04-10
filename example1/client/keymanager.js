const { createContext, CryptoFactory } = require('sawtooth-sdk/signing')
const {Secp256k1PrivateKey} = require('sawtooth-sdk/signing/secp256k1')	
const context = createContext('secp256k1')
const fs = require('fs')
const path = require('path')
const env = require('../shared/env')

function KeyManager() {
    this.signer1;
    // var res=fs.readFileSync(path.resolve(__dirname, './keys/' + username + '.env'));
    // const privateKeyStr = JSON.parse(res).PRIVATE_KEY
    // this.signer1 = new CryptoFactory(context).newSigner(Secp256k1PrivateKey.fromHex(privateKeyStr))
}

KeyManager.prototype.createkeys = function(username) {
    privateKey = context.newRandomPrivateKey()
    signer = new CryptoFactory(context).newSigner(privateKey)
    output = {
        PRIVATE_KEY: privateKey.asHex(),
        PUBLIC_KEY: signer.getPublicKey().asHex(),
        USERNAME: username
    }

    return  JSON.stringify(output);
}



KeyManager.prototype.sign= function(data,username){
    var res=fs.readFileSync(path.resolve(__dirname, './keys/' + username + '.env'));
    const privateKeyStr = JSON.parse(res).PRIVATE_KEY
    this.signer1 = new CryptoFactory(context).newSigner(Secp256k1PrivateKey.fromHex(privateKeyStr))
    if (this.signer1){
        return this.signer1.sign(data);
    }
    else{
        console.log(this.privateKey)
        this.signer = new CryptoFactory(context).newSigner(this.privateKey)
         return this.signer.sign(data)
    }

}

KeyManager.prototype.savekeys = function(username,jsonContent) {

         fs.writeFileSync(path.resolve(__dirname, './keys/' + username + '.env'), jsonContent);
    }


KeyManager.prototype.readpublickey = function(username){

            var res=fs.readFileSync(path.resolve(__dirname, './keys/' + username + '.env'));
            return (JSON.parse(res).PUBLIC_KEY);
    }

    KeyManager.prototype.readprivatekey = function(username){

        var res=fs.readFileSync(path.resolve(__dirname, './keys/' + username + '.env'));
        return (JSON.parse(res).PRIVATE_KEY);
}


KeyManager.prototype.doesKeyExist = function(username){
        return (fs.existsSync(path.resolve(__dirname, './keys/' + username + '.env')));   
    }
  
// var args = process.argv;
// KeyManager= new KeyManager();
// var payload = JSON.parse(args[2])
// if(KeyManager.doesKeyExist(payload.username)){
//     console.log("keys are already created for"+payload.username);
// }else{
//     var output = KeyManager.createkeys(payload.username)
    
//     KeyManager.savekeys(payload.username,output)
//     console.log("sucess")
//     KeyManager.readpublickey(payload.username);  
  
// }



 module.exports =  KeyManager ;



