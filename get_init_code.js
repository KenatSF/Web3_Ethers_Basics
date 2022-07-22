const fs = require('fs');
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, './.env') })
const { keccak256 } = require('@ethersproject/solidity'); 

const file_name = "GNXPair";
const contract = JSON.parse(fs.readFileSync(process.env.ABI_PATH + file_name + ".json", 'utf-8'));
const byte_code = JSON.stringify(contract.bytecode);


const COMPUTED_INIT_CODE_HASH = keccak256(['bytes'], [`0x${byte_code}`]);
console.log("Init code:");
console.log(COMPUTED_INIT_CODE_HASH);

