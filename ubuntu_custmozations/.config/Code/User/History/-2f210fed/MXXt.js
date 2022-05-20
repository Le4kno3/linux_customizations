require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts")
  .addParam("contract", "Give Contract Address")
  .setAction(, async (taskArgs) => {
  [steve, takshil, bob, martin] = await ethers.getSigners();

  const contractAddr = taskArgs.contract
  const MyHalbornToken = await ethers.getContractFactory("HalbornToken")

  const accounts = await ethers.getSigners()
  const signer = accounts[0]
  const myFirstContract = await new ethers.Contract(contractAddr, MyFirstContract.interface, signer)

  let result = BigInt(await myFirstContract.getNumber()).toString()

  console.log("stored value is: " + result);
  

});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.0",
};