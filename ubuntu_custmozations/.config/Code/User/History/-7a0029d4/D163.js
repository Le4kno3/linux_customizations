const { ethers } = require("hardhat");

task("read-balance", "Prints an account's balance")
  .addParam("contract", "The contract's address")
  .setAction(async (taskArgs) => {
    
    //fetch address of the contract fetched from tasks parameter
    const contractAddress = taskArgs.contract
    
    // specify contract
    const FirstContract = await ethers.getContractFactory("FirstContract");

    //ether.js specific code = signer information
    const accounts = await ethers.getSigners();
    const signer = accounts[0]

    // create a new instance of the contract.
    const myFirstContract = await new ethers.Contract(contractAddress, FirstContract.interface, signer)

    let result = BigInt(await myFirstContract.getNumber()).toString();

    console.log(web3.utils.fromWei(balance, "ether"), "ETH");
  });

module.exports = {};
