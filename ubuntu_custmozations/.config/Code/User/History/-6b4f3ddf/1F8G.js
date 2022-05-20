async function main() {
    // creating a new instance of the solidity contract.
    const AttackContract = await ethers.getContractFactory("AttackContract");
    
    //this is what we need to interact with the smart contract.
    const myAttackContract = await AttackContract.deploy("Hello, Hardhat!");
  
    //deploy the contract
    await myAttackContract.deployed();
  
    //give user confirmation that contract is deployed
    console.log("Contract deployed to:", myAttackContract.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  