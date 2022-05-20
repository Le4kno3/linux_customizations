const { experimentalAddHardhatNetworkMessageTraceHook } = require("hardhat/config");

//task1
task("read-number", "Reads the number")
  .addParam("contract", "The contract")
  .setAction(async (taskArgs) => {
    
    const contractAddr = taskArgs.contract;
    const MyFirstContract = await ethers.getContractFactory("MyFirstContract");
    
    const accounts = await ethers.getSigner()
    const signer = accounts[0]
    const myFirstContract = await new ethers.Contract(contractAddr, MyFirstContract, signer);


    let result = BigInt(await myFirstContract.getNumber()).toString()
    const account = web3.utils.toChecksumAddress(taskArgs.account);
    const balance = await web3.eth.getBalance(account);

    console.log("stored value is: " + result);
  });

//task1
task("write-number", "Write the number")
  .addParam("contract", "The contract")
  .addParam("value", "The value")
  .setAction(async (taskArgs) => {
    
    const contractAddr = taskArgs.contract;
    const value = taskArgs.value;

    const MyFirstContract = await ethers.getContractFactory("MyFirstContract");
    
    const accounts = await ethers.getSigner()
    const signer = accounts[0]
    const myFirstContract = await new ethers.Contract(contractAddr, MyFirstContract, signer);


    let result = await myFirstContract.setNumber(value);


    console.log("value set: " + value);
  });


module.exports = {};
