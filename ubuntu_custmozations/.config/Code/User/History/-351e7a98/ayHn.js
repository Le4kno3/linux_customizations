async function main() {
    // creating a new instance of the solidity contract.
    const EscrowUnsafe = await ethers.getContractFactory("EscrowUnsafe");
    
    //this is what we need to interact with the smart contract.
    const myEscrowUnsafe = await EscrowUnsafe.deploy("Hello, Hardhat!");
  
    //deploy the contract
    await myEscrowUnsafe.deployed();
  
    //give user confirmation that contract is deployed
    console.log("Contract deployed to:", myEscrowUnsafe.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  