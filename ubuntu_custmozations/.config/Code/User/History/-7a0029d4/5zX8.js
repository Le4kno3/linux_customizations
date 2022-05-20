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

    // create a new instance of the LIVE contract
    const myFirstContract = await new ethers.Contract(contractAddress, FirstContract.interface, signer)

    // main code of interaction with the contract.
    let result = BigInt(await myFirstContract.getNumber()).toString();

    console.log("Stored Value is: "+ result);
  });

task("write-balance", "Sets an account's balance")
  .addParam("contract", "The contract's address")
  .addParam("value", "Set balance value")
  .setAction(async (taskArgs) => {
    
    //fetch address of the contract fetched from tasks parameter
    const contractAddress = taskArgs.contract
    
    // specify contract
    const FirstContract = await ethers.getContractFactory("FirstContract");

    //ether.js specific code = signer information
    const accounts = await ethers.getSigners();
    const signer = accounts[0];

    // create a new instance of the LIVE contract
    const myFirstContract = await new ethers.Contract(contractAddress, FirstContract.interface, signer);

    let result = await myFirstContract.setNumber(value);

    console.log("Stored Value is: "+ value);
  });

module.exports = {};
