
// task("read-balance", "Prints an account's balance")
//   .addParam("contract", "The contract's address")
//   .setAction(async (taskArgs) => {
    
//     //fetch address of the contract fetched from tasks parameter
//     const contractAddress = taskArgs.contract
    
//     // specify contract
//     const FirstContract = await ethers.getContractFactory("FirstContract");

//     //ether.js specific code = signer information
//     const accounts = await ethers.getSigners();
//     const signer = accounts[0]

//     // create a new instance of the LIVE contract
//     const myFirstContract = await new ethers.Contract(contractAddress, FirstContract.interface, signer)

//     // main code of interaction with the contract.
//     let result = BigInt(await myFirstContract.getBalance()).toString()

//     console.log("Stored Value is: "+ result);
//   });

task("read-balance", "Reads the number")
  .addParam("contract", "The contract")
  .setAction(async (taskArgs) => {
    const contractAddr = taskArgs.contract
    const MyFirstContract = await ethers.getContractFactory("FirstContract")

    const accounts = await ethers.getSigners()
    const signer = accounts[0]
    const myFirstContract = await new ethers.Contract(contractAddr, MyFirstContract.interface, signer)

    let result = BigInt(await myFirstContract.getBalance()).toString()

    console.log("stored value is: " + result);
  });

task("write-balance", "Sets an account's balance")
  .addParam("contract", "The contract's address")
  .addParam("value", "Set balance value")
  .setAction(async (taskArgs) => {
    
    //fetch address of the contract fetched from tasks parameter
    const contractAddress = taskArgs.contract
    const value = taskArgs.value;
    // specify contract
    const FirstContract = await ethers.getContractFactory("FirstContract");

    //ether.js specific code = signer information
    const accounts = await ethers.getSigners();
    const signer = accounts[0];

    // create a new instance of the LIVE contract
    const myFirstContract = await new ethers.Contract(contractAddress, FirstContract.interface, signer);

    let result = await myFirstContract.setBalance(value);

    console.log("Stored Value is: "+ value);
  });

module.exports = {};
