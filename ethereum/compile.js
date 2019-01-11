const path=require('path');
const fs=require('fs');
const solc=require('solc');


const samplePath = path.resolve(__dirname,'contracts','Sample.sol');
const source= fs.readFileSync(samplePath,'utf8');
// import and extract the contract to compile it

module.exports=solc.compile(source,1).contracts[':EthBay'];
//after compiling ,it consists of raw compiled contract( bytecode)
// and javascript ABI
