/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
    },
    kovan: {
      url: RPC_URL,
      accounts: [PRIVATE_KEY]
    }
  }
  solidity: "0.8.6",
};
