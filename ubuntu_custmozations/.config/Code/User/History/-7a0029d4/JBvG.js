
task("read-balance", "Prints an account's balance")
  .addParam("contract", "The contract's address")
  .setAction(async (taskArgs) => {
    
    //fetch address of the contract fetched from tasks parameter
    const contractAddress = taskArgs.contract
    
    // creating a new instance of the solidity contract.
    const FirstContract = await ethers.getContractFactory("FirstContract");

    const account = web3.utils.toChecksumAddress(taskArgs.account);
    const balance = await web3.eth.getBalance(account);

    console.log(web3.utils.fromWei(balance, "ether"), "ETH");
  });

module.exports = {};
