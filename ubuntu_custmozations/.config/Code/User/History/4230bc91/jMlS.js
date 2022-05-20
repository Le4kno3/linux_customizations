//
/**
 * @type import('hardhat/config').HardhatUserConfig
 */

//importing
require('dotenv').config()
require("@nomiclabs/hardhat-ethers"); //for deploying smart contract to ethereum chain using ethers.js
require("./tasks/MyContractTasks.js")
require("hardhat-forta");

const RPC_URL = process.env.RPC_URL

const TESTNET_PRIVATE_KEY = process.env.TESTNET_PRIVATE_KEY

module.exports = {
  defaultNetwork: "hardhat_local",
  networks: {
    hardhat: {
      url: ETHEREUM_MAINNET_RPC_URL,
      accounts: [MAINNET_PRIVATE_KEY]
    },
    hardhat_local: {
      url: RPC_URL,
      accounts: [TESTNET_PRIVATE_KEY]
    },
    kovan: {
      url: RPC_URL,
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
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 40000
  }
}
