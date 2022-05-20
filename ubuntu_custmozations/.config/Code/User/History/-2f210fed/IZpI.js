require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts")
  .addParam()
  .setAction(, async (taskArgs, hre) => {
  [steve, takshil, bob, martin] = await hre.ethers.getSigners();

  label = "HalbornToken"
  symobol = "HAL"
  amount = scientificToDecimals(10000 * 10 ** 18) //total tokens = 100 tokens + convert scientific (1e+22) form to digits form for big numbers
  deployer = steve.address //"0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266" //address of owner
  root = "0x02446fb530b6910eeb393d46bc62ab36ddca2c8028366c87507ff3091172d6d1" //any hash value of type byte32

  const MyHalbornToken = await ethers.getContractFactory('HalbornToken', steve);
  const myHalbornToken = await MyHalbornToken.deploy(label, symobol, amount, deployer, root);
  await myHalbornToken.deployed();
  

});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.0",
};