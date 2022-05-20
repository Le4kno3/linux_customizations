//
/**
 * @type import('hardhat/config').HardhatUserConfig
 */

//importing
require('dotenv').config()
require("@nomiclabs/hardhat-ethers"); //for deploying smart contract to ethereum chain using ethers.js
require("./tasks/MyContractTasks.js")
require("hardhat-forta");

const TESTNET_RPC_URL = process.env.TESTNET_RPC_URL
const MAINNET_RPC_URL = process.env.MAINNET_RPC_URL
// const MAINNET_PRIVATE_KEY = process.env.MAINNET_PRIVATE_KEY
const TESTNET_PRIVATE_KEY = process.env.TESTNET_PRIVATE_KEY

module.exports = {
  defaultNetwork: "hardhat_local",
  networks: {
    hardhat: {
      // forking: {
      //   url: MAINNET_RPC_URL, //MAINNET used
      // }
    },
    hardhat_local: {
      url: TESTNET_RPC_URL,
      accounts: [TESTNET_PRIVATE_KEY]
    },
    kovan: {
      url: TESTNET_RPC_URL,
      accounts: [TESTNET_PRIVATE_KEY]
    },
  },
  solidity: {
    version: "0.8.6",
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
    artifacts: "./artifacts",
    agent: "./agent"
  },
  mocha: {
    timeout: 40000
  }
}
