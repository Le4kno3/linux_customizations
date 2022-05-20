const { ethers } = require("hardhat");

//task1
task("read-number", "Reads the number")
  .addParam("contract", "The contract")
  .setAction(async (taskArgs) => {
    
    const contractAddr = taskArgs.contract;
    const MyFirstContract = await ethers.getContractFactory("MyFirstContract");
    
    const account = web3.utils.toChecksumAddress(taskArgs.account);
    const balance = await web3.eth.getBalance(account);

    console.log(web3.utils.fromWei(balance, "ether"), "ETH");
  });

module.exports = {};