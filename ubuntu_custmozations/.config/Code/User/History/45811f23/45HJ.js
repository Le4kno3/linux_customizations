async function main() {
    // We get the contract to deploy
    const MyFirstContract = await ethers.getContractFactory("MyFirstContract");
    const myFirstContract = await Greeter.deploy("Hello, Hardhat!");
  
    await greeter.deployed();
  
    console.log("Greeter deployed to:", myFirstContract.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  