const HDWallerProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const  dotenv =  require('dotenv');

const {interface, bytecode} = require('./compile');

dotenv.config({path: './.env'});


const mnemonic = process.env.MNEMONICS;
const apiKey = process.env.END_POINT;


//console.log(`Key: ${apiKey} \n MN: ${mnemonic}`);

const provider = new HDWallerProvider(
    mnemonic,
    apiKey
);

const web3 = new Web3(provider);

const deploy = async () => {

    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account: ', accounts[0]);



    const result = await new web3.eth.Contract(JSON.parse(interface))
                 .deploy({data: bytecode})
                 .send({from: accounts[0], gas: '1000000'});

    console.log(interface);
    console.log('Contract Deployed to', result.options.address);
};


deploy();

