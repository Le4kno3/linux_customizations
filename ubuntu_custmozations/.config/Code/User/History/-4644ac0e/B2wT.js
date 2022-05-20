
const name = "HalbornToken"
const symobol = "HAL"
const amount = 10000 * 10 ** 18 //total tokens = 100 tokens
const deployer = "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266" //address of owner

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
  