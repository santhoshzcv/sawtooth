const { TransactionHandler } = require('sawtooth-sdk/processor/handler')
const { InvalidTransaction, InternalError } = require('sawtooth-sdk/processor/exceptions')
const cbor = require('cbor')
const env = require('../shared/env');
const { get_uploader_address, get_kyc_address } = require('../shared/Addressing')

const encode = obj => Buffer.from(JSON.stringify(obj))
const decode = buf => JSON.parse(buf);

class SmallBankHandler extends TransactionHandler {

    constructor() {
        super(env.familyName, [env.familyVersion], [env.TP_NAMESPACE])
        this.signer_public_keys = "";
    }

    uploadData(state, id, name, bankname) {
        let investor_details = {
            investor_id: id,
            investor_name: name,
            bank_name: bankname,
            Status: "Pending"
        };
        console.log(investor_details);
        let address = get_uploader_address(id);

        return state.getState([address]).then(
            (stateEntries) => {
                const entry = stateEntries[address];
                if (entry == null || entry == '') {
                    return state.setState({
                        [address]: encode([investor_details])
                    }).then((result) => {
                        console.log(result);
                    }).catch((err) => {
                        console.log(err);
                    })
                } else {
                    let investor_details1 = decode(entry);
                    investor_details1.push(investor_details);
                    return state.setState({
                        [address]: encode(investor_details1)
                    }).then((result) => {
                        console.log(result);
                    }).catch((err) => {
                        console.log(err);
                    })
                }
            })
    }

    kyc_verification(state, investor_id, verifier_id, status) {
        let investor_address = get_uploader_address(investor_id);
        let verifier_address = get_kyc_address(investor_id);
        return state.getState([investor_address]).then(
            (stateEntries) => {
                const entry = stateEntries[investor_address];
                let investor_details = decode(entry);
                let investor_detail_verify = investor_details.pop();
                investor_detail_verify.Status = status;
                investor_details.push(investor_detail_verify);
                console.log(investor_details);
                console.log(investor_detail_verify.publickey = this.signer_public_key);
                return state.setState({
                    [investor_address]: encode(investor_details)
                }).then((result) => {
                    console.log(result);
                    return state.setState({
                        [verifier_address]: encode(investor_detail_verify)
                    }).then((result) => {
                        console.log(result);
                    }).catch((err) => {
                        console.log(err);
                    })
                }).catch((err) => {
                    console.log(err);
                })

            })
    }

    getData(state, customer_id) {
        let address = get_uploader_address(customer_id)
        if (!address) {
            throw InvalidTransaction("Failed to load Account: {:?}", err)
        } else {
            return state.getState([address]).then((stateEntries) => {
                const entry = stateEntries[address]
                if (entry == null || entry == '') {
                    console.log("data is empty")
                } else {
                    let investor_details = decode(entry);
                    console.log("investor_details" + entry);
                    console.log(investor_details);
                }
            })
        }
    }


    getVerifiedData(state, verifier_id) {
        let address = get_kyc_address(verifier_id)
        if (!address) {
            throw InvalidTransaction("Failed to load Account: {:?}", err)
        } else {
            return state.getState([address]).then((stateEntries) => {
                const entry = stateEntries[address]
                if (entry == null || entry == '') {
                    console.log("data is empty")
                } else {
                    let investor_details = decode(entry);
                    console.log("investor_details" + entry);
                    console.log(investor_details);
                }
            })
        }
    }

    apply(transactionProcessRequest, state) {
        let header = transactionProcessRequest.header;
        this.signer_public_key = header.signerPublicKey;
        let payload = cbor.decode(transactionProcessRequest.payload);
        console.log(payload);
        if (payload.verb === 'uploaddata') {
            return this.uploadData(state, payload.id, payload.name, payload.bankname);
        } else if (payload.verb === 'getdata') {
            return this.getData(state, payload.id);
        } else if (payload.verb === "kyc_verifier") {
            return this.kyc_verification(state, payload.investor_id, payload.verifier_id, payload.status)
        } else if (payload.verb === "verified") {
            return this.getVerifiedData(state, payload.verifier_id);
        } else {
            throw new InvalidTransaction(`Didn't recognize Verb "${verb}".\nMust be one of "create_account,deposit_money,make_deposit,withdraw_money or transfer_money"`)
        }
    }
}

module.exports = SmallBankHandler;