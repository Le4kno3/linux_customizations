async function main() {
    // creating a new instance of the solidity contract.
    const MyFirstContract = await ethers.getContractFactory("MyFirstContract");
    
    //this is what we need to interact with the smart contract.
    const myFirstContract = await MyFirstContract.deploy("Hello, Hardhat!");
  
    //deploy the contract
    await myFirstContract.deployed();
  
    //give user confirmation that contract is deployed
    console.log("Contract deployed to:", myFirstContract.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  