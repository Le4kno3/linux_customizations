//
/**
 * @type import('hardhat/config').HardhatUserConfig
 */

//importing
require('dotenv').config()
require("./tasks/HalbornToken_tasks.js")
require("@nomiclabs/hardhat-waffle");

const TESTNET_RPC_URL = process.env.TESTNET_RPC_URL
const TESTNET_PRIVATE_KEY = process.env.TESTNET_PRIVATE_KEY
// const MAINNET_RPC_URL = process.env.MAINNET_RPC_URL
// const MAINNET_PRIVATE_KEY = process.env.MAINNET_PRIVATE_KEY


module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      // forking: {
      //   url: MAINNET_RPC_URL, //MAINNET used
      // }
    }
    // ganache: {
    //   url: 'http://127.0.0.1:7545',
    //   accounts: ['0xbd81369e90c955905cfe6c0d6c992b0d41698b5b7cc17998e2ae1c48f7703b80']
    // }
    // hardhat_local: {
    //   url: 'http://127.0.0.1:8545',
    //   accounts: ['0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80']
    // }
    // kovan: {
    //   url: TESTNET_RPC_URL,
    //   accounts: [TESTNET_PRIVATE_KEY]
    // },
    // ropsten: {
    //   url: TESTNET_RPC_URL,
    //   accounts: [TESTNET_PRIVATE_KEY]
    // }
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
    tests: "./tests",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 40000
  }
}
