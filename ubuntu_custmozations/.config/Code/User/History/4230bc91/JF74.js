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

const PRIVATE_KEY = process.env.PRIVATE_KEY

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      url: RPC_URL,
      accounts: [PRIVATE_KEY]
    },
    kovan: {
      url: RPC_URL,
      accounts: [PRIVATE_KEY]
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
