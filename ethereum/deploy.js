const HDWalletProvider=require('truffle-hdwallet-provider');
const Web3=require('web3');
const {interface, bytecode}=require('./compile');


const provider=new HDWalletProvider(
  'leopard demand river voyage paddle during notable roof survey inquiry timber gas',
  '	https://rinkeby.infura.io/B0rB4K43YVrZVcopTWdb'
);
const web3=new Web3(provider);
const deploy=async () => {
  const accounts=await web3.eth.getAccounts();

  console.log("Attempting to deploy the account from",accounts[0]);

  const result=await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data:'0x' + bytecode})
    .send({from:accounts[0],gas:'1000000'});

  console.log("CONTRACT DEPLOYED TO",result.options.address);
  console.log(interface);
};
deploy();
