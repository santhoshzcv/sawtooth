const { TransactionHandler } = require('sawtooth-sdk/processor/handler')
const { InvalidTransaction, InternalError } = require('sawtooth-sdk/processor/exceptions')
const cbor = require('cbor')
const env = require('../shared/env');
// const SimpleStoreState = require('./state');
const { get_account_address } = require('../shared/Addressing')

const encode = obj => Buffer.from(JSON.stringify(obj))
const decode = buf => JSON.parse(buf);

class SmallBankHandler extends TransactionHandler {

    constructor() {
        super(env.familyName, [env.familyVersion], [env.TP_NAMESPACE])
        this.signer_public_keys = "";
    }

    get_account(customer_id, state) {
        let address = get_account_address(customer_id)
        if (!address) {
            throw InvalidTransaction("Failed to load Account: {:?}", err)
        } else {
            return state.getState([address]).then((result) => {
                console.log(result);
            }).catch((err) => {
                console.log("no account found");
            })
        }
    }

    create_account(state, id, name, savings, checking) {
        let new_account_data = this.make_Account_To_JSON(id, name, savings, checking)

        return this.save_account(state, new_account_data, id)

    }

    transfer_money(source_customer_id, dest_customer_id, amountToTransfer,state) {
        let source_account  = get_account_address(source_customer_id);
        let dest_account = get_account_address(dest_customer_id);
        if (!source_account && !dest_account)
            throw new InvalidTransaction("Both source and dest accounts must exist")
         else {
             return state.getState([source_account]).then((stateEntries) => {
                const entry = stateEntries[source_account]
                let srcaccount = decode(entry);
                if (srcaccount.customer_id != source_customer_id){
                    throw new InvalidTransaction('Only an account owner should transfer money');
                }
                var srcbalance = srcaccount.account.checking_balance;
                if (srcbalance < amountToTransfer) {
                    throw new InvalidTransaction(`Insufficient funds in source checking account ${srcbalance}`)
                }else{
                return state.getState([dest_account]).then((stateEntries) => {
                    const entry = stateEntries[dest_account];
                    let destacount = decode(entry);
                    let srcbalance1 = srcbalance - amountToTransfer;
                    srcaccount.account.checking_balance =srcbalance1;
                    let dstbalance=destacount.account.checking_balance;
                    dstbalance= dstbalance + amountToTransfer;
                    destacount.account.checking_balance = dstbalance;
                    console.log(destacount.account);
                    console.log(srcaccount.account);
                    return state.setState({
                        [source_account]: encode(srcaccount, source_customer_id)
                    }).then((result) => {
                        console.log("amount is debited from"+result)
                        return state.setState({
                            [dest_account]: encode(destacount, dest_customer_id)
                        }).then((result) => {
                            console.log("the amount is credited to " + result)
                        }).catch((err) => {
                            console.log(err);
                        })
                    }).catch((err) => {
                        console.log(err);
                    })
  
                })
            }
        })
    }
    }

    withdraw_money(customer_id, amountToWithDraw, state) {
        let address = get_account_address(customer_id)
        if (!address) {
            throw InvalidTransaction("Failed to load Account: {:?}", err)
        } else {
            return state.getState([address]).then((stateEntries) => {
                const entry = stateEntries[address]
                let account = decode(entry);
                console.log("account" + entry);
                console.log(account.account);
                if (account.customer_id != customer_id) {
                    throw new InvalidTransaction('Only an account owner can deposit money');
                } else {

                    console.log(account.account.checking_balance);
                    let balance = account.account.checking_balance;
                    if (balance < amountToWithDraw) {
                        throw new InvalidTransaction(`Not enough money. The amount should be lesser or equal to ${balance}`)
                    } else {
                        let newBalance = account.account.checking_balance - amountToWithDraw;
                        console.log("newbalance" + newBalance);
                        account.account.checking_balance = newBalance;
                        console.log(account.customer_id);
                        console.log(account.account);
                        return state.setState({
                            [address]: encode(account, customer_id)
                        }).then((result) => {
                            console.log("the amount is debited" + result)
                        }).catch((err) => {
                            console.log(err);
                        })
                    }
                }
            })

        }
    }

    deposit_money(customer_id, amountToDeposit, state) {

        let address = get_account_address(customer_id)
        if (!address) {
            throw InvalidTransaction("Failed to load Account: {:?}", err)
        } else {
            return state.getState([address]).then((stateEntries) => {
                const entry = stateEntries[address]
                let account = decode(entry);
                if (account.customer_id != customer_id) {
                    throw new InvalidTransaction('Only an account owner can deposit money');
                } else {
                    console.log("accountbalancebefore" + entry);
                    console.log("accountbalancebefore" + entry);
                    console.log(account.account.checking_balance);
                    let balance = account.account.checking_balance + amountToDeposit;
                    console.log("accountbalance" + balance);
                    account.account.checking_balance = balance;
                    console.log(account.customer_id);
                    console.log(account.account);
                    return state.setState({
                        [address]: encode(account, customer_id)
                    }).then((result) => {
                        console.log("the amount is credited"+result);
                    }).catch((err) => {
                        console.log(err);
                    })
                }
            })
        }




    }

    make_Account_To_JSON(id, name, savings, checking) {
        let account_data = {
            customer_id: id,
            customer_name: name,
            checking_balance: checking,
            savings_balance: savings,
            public_key: this.signer_public_key
        };
        return account_data;
    }

    save_account(state, account, customer_id) {
        let address = get_account_address(customer_id)
        console.log(address);
        console.log(account);
        return state.setState({
            [address]: encode({ account, customer_id })
        }).then((result) => {
            console.log(result);
        }).catch((err) => {
            console.log(err);
        })

    }

    apply(transactionProcessRequest, state) {
        console.log(transactionProcessRequest);
        let header = transactionProcessRequest.header;
        this.signer_public_key = header.signerPublicKey;
        let payload = cbor.decode(transactionProcessRequest.payload);
        if (payload.verb === 'create_account') {
            return this.create_account(state, payload.customer_id, payload.customer_name, payload.savings_balance, payload.checking_balance)
        } else if (payload.verb === 'deposit_money') {
            return this.deposit_money(payload.customer_id, payload.amount, state)
        } else if (payload.verb === 'withdraw_money') {
            return this.withdraw_money(payload.customer_id, payload.amount, state)
        } else if (payload.verb === 'transfer_money') {
            return this.transfer_money(payload.source_customer_id, payload.dest_customer_id, payload.amount, state)
        } else {
            throw new InvalidTransaction(`Didn't recognize Verb "${verb}".\nMust be one of "create_account,deposit_money,make_deposit,withdraw_money or transfer_money"`)
        }
    }
}

module.exports = SmallBankHandler;