
var protos = require("./kyc.js")

function protobuf1(payload) {

if (payload.verb == 'uploadkycdata') {
     var createUploadKycparams = protos.model.UploadKycParams.create()
     createUploadKycparams.id= payload.id;
     createUploadKycparams.name = payload.name;
     createUploadKycparams.bankname = payload.bankname;

     var payload1 = protos.model.Payload.create()
     payload1.action = protos.model.Payload.Action.UPLOAD_KYC_DATA;
     payload1.upload_kyc_data =createUploadKycparams;
     return payload1;

}
else if(payload.verb == 'verifykyc'){
     var createVerifyKycparams = protos.model.VerifyKycParams.create();
     createVerifyKycparams.id = payload.id;
     createVerifyKycparams.status = payload.status;

     var payload1 = protos.model.Payload.create()
     payload1.action = protos.model.Payload.Action.VERIFY_KYC_DATA;
     payload1.verify_kyc_data = createVerifyKycparams;
     return payload1
  }
else{
    console.log("specify the action")
   }
}

module.exports ={ protobuf1 };


