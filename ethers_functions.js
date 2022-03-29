const { ethers } = require('ethers');                                                         

async function enviar_transaccion(provider, privateKey, address_to, value) {
    try {
        let signer = new ethers.Wallet(privateKey, provider);

    const tx = {
        to: address_to,
        value: ethers.utils.parseUnits(value.toString(), 18),
    };

    const createReceipt = await signer.sendTransaction(tx);
    return await createReceipt.wait();
    } catch (e) {
        console.log("Error at: enviar_trasaccion()");
        return null;
    }
}


module.exports = {
    enviar_transaccion: enviar_transaccion
}