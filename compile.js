const path=require('path');
const fs=require('fs-extra');
const solc=require('solc');


const auctionPath = path.resolve(__dirname,'contracts','Auction2.sol');
const source= fs.readFileSync(auctionPath,'utf8');
// import and extract the contract to compile it

module.exports=solc.compile(source,1).contracts[':EthBay'];
console.log(solc.compile(source,1));
//after compiling ,it consists of raw compiled contract( bytecode)
// and javascript ABI
