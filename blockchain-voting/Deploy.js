Web3 = require("web3");
solc = require('solc');
fs = require("fs");

// Block chain apirpc port
// private geth node provider
// web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8081"));   

// test rpc provider
// \node_modules\ethereumjs-testrpc\build>node cli.node.js
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

// web3 = new Web3();
// var TestRPC = require("ethereumjs-testrpc");
// web3.setProvider(TestRPC.provider({unlocked_accounts:['0xfac3bc3201226bec30db2c9a68a8015e2ab8e267']}));


// Read and Compile code
//console.log('------------------ Code file read');
code = fs.readFileSync('VotingContract.sol').toString();
//console.log('------------------ Code compiling');
compiledCode = solc.compile(code);
// console.log(compiledCode);

console.log('------------------ Abi Definition');
abiDefinition = JSON.parse(compiledCode.contracts[':VotingContract'].interface)
var str = JSON.stringify(abiDefinition);
console.log(str);

console.log('------------------ Reading Byte code ');
byteCode = compiledCode.contracts[':VotingContract'].bytecode
console.log('0x' + byteCode);

console.log('------------------ Creating contract ')
VotingContract = web3.eth.contract(abiDefinition);
console.log('------------------ Voting contract created ')
console.log(VotingContract.options);

web3.eth.getAccounts(function (error, result, p2) {
    if (error) {
        console.log("!!!...Error...!!!");
        console.log(error);
    }
    else {
        var defaultAcc = result[0];
        console.log("------------------ DefaultAcc Address => ", defaultAcc);

        // console.log('------------------ Unlocking acc ')
        // web3.personal.unlockAccount(defaultAcc,'test12345'
        // , function(res){
        //     console.log(res);
        // });   

        var deployedContract = null;
        console.log('------------------ Deploying contract ');
        VotingContract.new(['BJP', 'CONG', 'AAP', 'BSP', 'SP', 'OTHERS'], { data: '0x' + byteCode, from: defaultAcc, gas: 4700000 }
            , function (err, contract) {
                console.log(err);
                console.log(contract);
                deployedContract = contract;
                console.log('------------------ Deployed contract address : ' + deployedContract.address);
            });
    }
});
