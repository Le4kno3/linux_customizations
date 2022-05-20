//
/**
 * @type import('hardhat/config').HardhatUserConfig
 */

//importing
require('dotenv').config()
require("@nomiclabs/hardhat-ethers"); //for deploying smart contract to ethereum chain using ethers.js
require("./tasks/MyContractTasks.js")
require("hardhat-forta");

const KOVAN_RPC_URL = process.env.KOVAN_RPC_URL

const PRIVATE_KEY = process.env.PRIVATE_KEY

module.exports = {
  defaultNetwork: "mumbai",
  networks: {
    hardhat: {
    },
    mumbai: {
      url: "https://speedy-nodes-nyc.moralis.io/c9487b1dbd1a78d99fab5a2b/polygon/mumbai",
      accounts: ["e52a6c96c33e82034220d8c289f8815c8d3e97c92f7c46f663354ba03c771040"]
    }
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
