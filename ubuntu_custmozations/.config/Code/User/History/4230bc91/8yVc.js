//
/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require("@nomiclabs/hardhat-ethers");


const KOVAN_RPC_URL = process.env.KOVAN_RPC_URL

const PRIVATE_KEY = process.env.PRIVATE_KEY

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
    },
    kovan: {
      url: "https://speedy-nodes-nyc.moralis.io/c9487b1dbd1a78d99fab5a2b/eth/kovan",
      accounts: ["e52a6c96c33e82034220d8c289f8815c8d3e97c92f7c46f663354ba03c771040"] //because private key is not string, it is collection of string (mnemonics)
    }
  },
  solidity: {
    version: "0.8.0",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 40000
  }
}
