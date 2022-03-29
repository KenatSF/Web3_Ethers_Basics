
// Note: for new web3.eth.Contract(abi, contractAddress) we have .call() and .send() (This only works for unblocked accounts)
// for signing a transaction, check out Solidity_Accessing_Private_Data repository 

async function firmar_eth(web3, message, from) {
   return await web3.eth.sign(message, from);
}

async function firmar_accounts(web3, message, privateKey) {                 // Final characters with 1b or 1c format
    return await web3.eth.accounts.sign(message, privateKey).signature;
}

async function firmar_transaccion_eth (web3, from, to, value, data) {
    try {
        const tx = {
            from: from, 
            to: to, 
            value: value,
            gas: 150000, 
            gasPrice: web3.utils.toWei("50", 'gwei'), // gas_price must be string
            data: data
        };
    
        return await web3.eth.signTransaction(tx, from);
    } catch(e) {
        console.log("Error at: firmar_trasaccion_eth()");
        return null;
    }
}

async function firmar_transaccion_accounts(web3, privateKey, from, to, value, data) {
    try {
        const tx = {
            from: from, 
            to: to, 
            value: value,
            gas: 150000, 
            gasPrice: web3.utils.toWei("50", 'gwei'), // gas_price must be string
            data: data
        };
    
        return await web3.eth.accounts.signTransaction(tx, privateKey);
    } catch(e) {
        console.log("Error at: firmar_transaccion_accounts()");
        return null;
    }
}

async function enviar_transaccion_firmada(web3, firma) {
    try {
        return await web3.eth.sendSignedTransaction(firma.rawTransaction);
    } catch(e) {
        console.log("Error at: enviar_transaccion_firmada");
        return null;
    }
}


module.exports = {  
    firmar_eth: firmar_eth, 
    firmar_accounts: firmar_accounts, 
    firmar_transaccion_eth: firmar_transaccion_eth,
    firmar_transaccion_accounts: firmar_transaccion_accounts,
    enviar_transaccion_firmada: enviar_transaccion_firmada
};