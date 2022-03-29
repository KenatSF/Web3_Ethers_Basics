const fs = require('fs');
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, './.env') })


const file_name = "Flashy";
const contract = JSON.parse(fs.readFileSync(process.env.ABI_PATH + file_name + ".json", 'utf-8'));

console.log("ABI");
console.log(JSON.stringify(contract.abi));

//console.log("BYTECODE");
//console.log(contract.bytecode);
