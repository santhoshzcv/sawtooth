

 create_account=(state,id,name,savings,checking)=>{
    new_account_data = make_Account_To_JSON(id,name,savings,checking)
    console.log("santhosh is ");
    save_account(state,new_account_data,id)
   }


   make_Account_To_JSON=(id,name,savings,checking)=>{
    account_data = {
        customer_id: id,
        customer_name: name,
        checking_balance: checking,
        savings_balance :savings,
        public_key : signer_public_key
    }; 
    return JSON.stringify(account_data); 
}
make_JSON_To_Account=(jsonString)=>{
    return JSON.parse(jsonString); 
}
save_account=(state,account,customer_id)=>{
    address = get_account_address(customer_id)
    return state.get([address]).then(entries => {

      const entry = entries[address]
      if (entry && entry.length > 0) {
        throw new InvalidTransaction('Customer ID in use')
      }
      return state.set({
        [address]: encode({name: account, customer_id})
      })
    })

}


deposit_money=(customer_id, amountToDeposit) =>{
    account = get_account(customer_id)
    if (!account){
        throw new InvalidTransaction("Failed to load Account: {:?}", err)
    }
    if(account.public_key != signer_public_key){
        throw new InvalidTransaction('Only an account owner can deposit money') 
    }else{
            balance = account.checking_balance + amountToDeposit;
            account.checking_balance = balance;
            save_account(customer_id,account)
    }  
}

withdraw_money=(customer_id, amountToWithDraw)=>{
    account = get_account(customer_id)
    if (!account){
        throw InvalidTransaction("Failed to load Account: {:?}", err)
    }
    if(account.public_key != signer_public_key){
        throw new InvalidTransaction('Only an account owner can witthdraw money') 
    }else{ 
            balance = account.checking_balance - amountToWithDraw;
            account.checking_balance = balance;
            save_account(customer_id,account)
    }   
}

make_deposit=(customer_id,amountToSave)=>{
    account = get_account(customer_id)
    if (!account){
        throw new InvalidTransaction("Failed to load Account: {:?}", err)
    }
    if(account.public_key != signer_public_key){
        throw new InvalidTransaction('Only an account owner can make deposit')
    }else {
        balance = account.savings_balance + amountToSave;
        account.savings_balance = balance;
        save_account(customer_id,account)
    }     
}
transfer_money=(source_customer_id, dest_customer_id, amountToTransfer)=>{
    source_account = get_account(source_customer_id)
    dest_account = get_account(dest_customer_id)
    
    if(!source_account && !dest_account)
        throw new InvalidTransaction("Both source and dest accounts must exist")
    if(source_account.public_key != signer_public_key)
        throw new InvalidTransaction('Only source account owner can transfer money')
    if(source_account.checking_balance() < amountToTransfer) {
        throw InvalidTransaction("Insufficient funds in source checking account")
    } else {
        source_balance = source_account.checking_balance() - amountToTransfer;
        source_account.checking_balance = source_balance;
        dest_balance = dest_account.get_checking_balance() + amountToTransfer;
        dest_account.checking_balance = dest_balance;
        save_account(source_customer_id,source_account)
        save_account(dest_customer_id,dest_account)
    }
}