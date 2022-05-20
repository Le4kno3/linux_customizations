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
.then(() => process.exit(0))
.catch((error) => {s
    console.error(error);
    process.exit(1);
});