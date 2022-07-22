const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
//const web3 = new Web3("https://rinkeby.infura.io/v3/" + process.env.INFURA_RINKENBY_KEY);
const { ethers } = require('ethers');
const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545');

const { firmar_eth, firmar_accounts, firmar_transaccion_eth, firmar_transaccion_accounts, enviar_transaccion_firmada } = require('./web3_functions');
const { enviar_transaccion } = require("./ethers_functions");
const {amount_In_filter, amount_Out_filter} = require('./utils');

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') })


async function main(){

    const accounts = await web3.eth.personal.getAccounts();
    console.log('-----------------------------------------------------------');
    console.log("Accounts: ")
    console.log(accounts);

    
    const hash_1 = await firmar_eth(web3, "Hola Mundo!", accounts[0]);
    const hash_2 = await firmar_accounts(web3, "Hola Mundo!", process.env.PRIVATE_KEY_0);
    console.log('-----------------------------------------------------------');
    console.log("FIRMAR: ");
    console.log(`Hash 1: ${hash_1}`);
    console.log(`Hash 2: ${hash_2}`);


    // // console.log('-----------------------------------------------------------');
    // // console.log("TEMPORAL ");
    // // console.log(web3.utils.toWei("1", "ether"));

    console.log('-----------------------------------------------------------');
    console.log("FIRMAR TRANSACCIÓN: ");
    const number = await amount_In_filter(web3, 1, 18);
    const signed_tx_1 = await firmar_transaccion_eth(web3, accounts[9], accounts[0], number, "");
    const signed_tx_2 = await firmar_transaccion_accounts(web3, process.env.PRIVATE_KEY_9, accounts[9], accounts[0], number, "");
    console.log(signed_tx_1);
    console.log(signed_tx_2);

    console.log('-----------------------------------------------------------');
    console.log("ENVIAR TRANSACCIÓN FIRMADA: ");
    const tx1 = await enviar_transaccion_firmada(web3, signed_tx_1);
    const tx2 = await enviar_transaccion_firmada(web3, signed_tx_2);
    console.log(tx1);
    console.log(tx2);


    console.log('-----------------------------------------------------------');
    console.log("ENVIAR TRANSACCIÓN: ");
    const tx3 = await enviar_transaccion(provider, process.env.PRIVATE_KEY_9, accounts[0], 1);
    console.log(tx3);

}
main();




