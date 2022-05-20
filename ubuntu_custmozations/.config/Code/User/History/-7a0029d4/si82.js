const { ethers } = require("hardhat");

task("read-balance", "Prints an account's balance")
  .addParam("contract", "The contract's address")
  .setAction(async (taskArgs) => {
    
    //fetch address of the contract fetched from tasks parameter
    const contractAddress = taskArgs.contract
    
    // creating a new instance of the solidity contract.
    const FirstContract = await ethers.getContractFactory("FirstContract");

    //ether.js specific code
    const accounts = await ethers.getSigners();

    const signer = accounts[0]

    const myFirstContract = await new ethers.Contract(contractAddress, FirstContract.interface, signer)

    let result = BigInt(await myFirstContract.getNumber()).toString()

    const account = web3.utils.toChecksumAddress(taskArgs.account);
    const balance = await web3.eth.getBalance(account);

    console.log(web3.utils.fromWei(balance, "ether"), "ETH");
  });

module.exports = {};
