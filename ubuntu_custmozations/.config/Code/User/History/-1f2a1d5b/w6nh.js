const { ethers } = require("ethers");

async function main() {

    // address of the owner
    const [deployer] = await ethers.getSigners();

    // specify contract
    const Token = await ethers.getContractFactory("Token");

    //this is what we need to interact with the smart contract.
    const myToken = await Token.deploy();

    //deploy the contract
    await myToken.deployed();

    //give contract details
    console.log("Owner address is:", deployer.address);
    console.log("Contract deployed to:", myToken.address);
}

main()
.then(() => process.exit(0))    //after execution of main, exit the process
.catch((error) => {
    console.error(error);   //catch errors
    process.exit(1);        //after an error is triggered, close the process
});