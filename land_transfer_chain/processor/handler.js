const { TransactionHandler } = require('sawtooth-sdk/processor/handler')
const { InvalidTransaction, InternalError } = require('sawtooth-sdk/processor/exceptions')
const cbor = require('cbor')
const env = require('../shared/env');
// const SimpleStoreState = require('./state');
const { get_land_address ,get_cultivation_address} = require('../shared/Addressing')

const encode = obj => Buffer.from(JSON.stringify(obj))
const decode = buf => JSON.parse(buf);

class SmallBankHandler extends TransactionHandler {

    constructor() {
        super(env.familyName, [env.familyVersion], [env.TP_NAMESPACE])
        this.signer_public_keys = "";
    }

    land_registration(state,land_data,hash) {
        let address = get_land_address(hash)
        console.log(address);
        let public_key= this.signer_public_keys;
        return state.setState({
            [address]: encode({ land_data,hash, public_key })
        }).then((result) => {
            console.log(result);
        }).catch((err) => {
            console.log(err);
        })
    }

    cultivation_land(state,cultivation_data,hash) {
        let address = get_cultivation_address(hash)
        console.log(address);
        let public_key= this.signer_public_keys;
        return state.setState({
            [address]: encode({ cultivation_data,hash, public_key })
        }).then((result) => {
            console.log(result);
        }).catch((err) => {
            console.log(err);
        })
    }

    apply(transactionProcessRequest, state) {
        let header = transactionProcessRequest.header;
        this.signer_public_keys = header.signerPublicKey;
        let payload = cbor.decode(transactionProcessRequest.payload);
        console.log(payload);
        if (payload.verb === 'land_registration') {
            return this.land_registration(state, payload.land_data, payload.hash)
        }else if(payload.verb === 'cultivation_land') {
            return this.cultivation_land(state, payload.cultivation_data, payload.hash)
        }else {
            throw new InvalidTransaction(`Didn't recognize Verb "${verb}".\nMust be one of "create_account,deposit_money,make_deposit,withdraw_money or transfer_money"`)
        }
    }
}

module.exports = SmallBankHandler;