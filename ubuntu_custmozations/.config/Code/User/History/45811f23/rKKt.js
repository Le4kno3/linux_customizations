async function main() {
    // creating a new instance of the solidity contract.
    const MyFirstContract = await ethers.getContractFactory("MyFirstContract");
    
    //this is what we need to interact with the smart contract.
    const myFirstContract = await MyFirstContract.deploy("Hello, Hardhat!");
  
    await myFirstContract.deployed();
  
    console.log("MyFristContract deployed to:", myFirstContract.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  