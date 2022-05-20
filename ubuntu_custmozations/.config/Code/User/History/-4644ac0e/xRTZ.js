
const name = "HalbornToken"
const symobol = "HAL"
const amount = 10000 * 10 ** 18 //total tokens
const deployer = "" //address of owner

async function main() {
    // creating a new instance of the solidity contract.
    const HalbornToken = await ethers.getContractFactory("HalbornToken");
    
    //this is what we need to interact with the smart contract.
    const myHalbornToken = await HalbornToken.deploy("Hello, Hardhat!");
  
    //deploy the contract
    await myHalbornToken.deployed();
  
    //give user confirmation that contract is deployed
    console.log("Contract deployed to:", myHalbornToken.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  