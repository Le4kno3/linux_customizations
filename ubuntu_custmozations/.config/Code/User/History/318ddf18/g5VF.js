const { Finding, FindingSeverity, FindingType } = require('forta-agent');
const { ethers } = require("ethers");
const https = require('https');
const axios = require('axios');

// const provider = new ethers.providers.JsonRpcProvider(`https://speedy-nodes-nyc.moralis.io/c9487b1dbd1a78d99fab5a2b/eth/mainnet`)

// load config file
const config = require('../agent-config.json');

// load configuration data from agent config file
const {
  developerAbbreviation: developerAbbrev,
  protocolName,
  protocolAbbrev,
  contracts,
} = config;

// const erc20TokenAddress = "0xA0b73E1Ff0B80914AB6fe0444E65848C4C34450b";
// const transferEvent = "event Transfer(address indexed from, address indexed to, uint256 value)";
// const transfers = transactionEvent.filterLog(transferEvent, erc20TokenAddress);
// console.log(`found ${transfers.length} transfer events`);
const ERC20_FUNCTION = "event Transfer(address indexed from, address indexed to, uint value)";
const ERC20_CONTRACT_ADDRESS = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
const TETHER_DECIMALS = 6;  //to convert actual "on the wire" value to "normalized" value to reach the value easily.


//specify the list of addresses (goerli) to test.
const audit_addresses = [
  '0x1961a995B49A1A76b576bB889d6509f6685ea471',
  '0x03791A210E2Ac10BE5575Ed2aC31845Eb453b9Fe',
  '0x9e584b8003d0929eF790047d37D6Ec7D8ef6655a'
];

test_address = audit_addresses[0];

// fetch past 10 transactions
let module_url = 'account';
let action_url  = 'txlist';
let address_url = test_address;
let startblock = '0';
let endblock = '99999999';
let page_url = '1';
let offset_url = '10';  //last 10 transactions
let sort_url = 'asc';
let apikey_ethscan='XKHFKV52IKJK3NMS3RFYFGIDUNMFNC7J3B';

const txOverview="https://api-goerli.etherscan.io/api?module=" + module_url + "&action=" + action_url + "&address=" + address_url + "&startblock=" + startblock + "&endblock=" + endblock + "&page=" + page_url + "&offset=" + offset_url + "&sort=" + sort_url + "&apikey=" + apikey_ethscan;

action_url  = 'tokentx';
module_url  = 'logs';
const txLogs="https://api-goerli.etherscan.io/api?module=" + module_url + "&action=" + action_url + "&address=" + address_url + "&startblock=" + startblock + "&endblock=" + endblock + "&page=" + page_url + "&offset=" + offset_url + "&sort=" + sort_url + "&apikey=" + apikey_ethscan;

async function receiveOverview() {
  const url = txOverview;
  let response = await axios.get(url);
  return response.data.result;  //only return relevant parts of the object.
}

async function receiveLogs() {
  const url = txLogs;
  let response = await axios.get(url);
  console.log(response)
  return response.data.result;  //only return relevant parts of the object.
}

//to print the tx overview
receiveOverview().then((data) => {
  //processing logic here
  data.forEach((transaction,index) => {
    console.log("\n"+index+1+". Transaction:")
    console.log("hash: "+transaction.hash)
    console.log("from: "+transaction.from)
    console.log("to: "+transaction.to)
    console.log("to: "+transaction.value)
    console.log("")
  })
});

//to print the tx logs
receiveLogs().then((data) => {
  //processing logic here
  data.forEach((transaction,index) => {
    console.log("\n"+index+1+". Log:")
    console.log("from: "+transaction.from)
    console.log("to: "+transaction.to)
    console.log("tokens transferred: "+transaction.value+" "+transaction.tokenSymbol)
    console.log("")
  })
});

console.log(txOverview);
console.log(txLogs);

// get list of addresses to watch
const contractList = Object.values(contracts);
if (contractList.length === 0) {
  throw new Error('Must supply at least one address to watch');
}

function createAlert(name, address, contractName, abbrev, type, severity) {
  return Finding.fromObject({
    name: `${name} Address Watch`,
    description: `Address ${address} (${contractName}) was involved in a transaction`,
    alertId: `${developerAbbrev}-${abbrev}-ADDRESS-WATCH`,
    type: FindingType[type],
    severity: FindingSeverity[severity],
  });
}

let counter = 0


async function handleTransaction(txEvent) {
  const findings = [];
  
  if(counter == 5){ //optional: stop the bot processing, when received 5 detection alerts.
    return findings;
  }

  //fetch the transaction address
  const txAddrs = Object.keys(txEvent.addresses).map((address) => address.toLowerCase());

  audit_addresses.forEach((test_address, index) => {

    
    
    
    // //checks if any of address taking part in transaction matches "the address to monitor".
    // if (txAddrs.includes(contract.address.toLowerCase())) { 

    //   //Success message: address to monitor is matched.
    //   console.log("* The transaction does involve address 0x28ef151f709E0Ffc7Ca0190DD8B1C9C2b86ba3A1\n");

    //   const params = Object.values(contracts)[index];
      
    //   // Fetch logs information - logs tells us token details.
    //   TransactionEvent = txEvent.filterLog(ERC20_FUNCTION, ERC20_CONTRACT_ADDRESS);

    //   // For all ERC20 USTD token transfers do...
    //   TransactionEvent.forEach((transferEvent) => {
        
    //     // extract transfer event arguments
    //     const { to, from, value } = transferEvent.args;
    //     // shift decimals of transfer value
    //     const normalizedValue = value.div(10 ** TETHER_DECIMALS);
        
    //     //alert the user about the USTD transaction done from "the address to monitor"
    //     findings.push(
    //       Finding.fromObject({
    //         name: "Tether Transfer Event",
    //         description: `Info of Tether Transfered: ${normalizedValue}`, //1 USDT = 1$
    //         alertId: "INFO-1",
    //         severity: FindingSeverity.Low,
    //         type: FindingType.Info,
    //         metadata: {
    //           to,
    //           from,
    //           normalizedValue,
    //         },
    //       })
    //     );
    //     counter = counter + 1;  //optional: limitation on testing, for dev purpose only.
    //   });
    // }
  });

  return findings;
}

module.exports = {
  handleTransaction,
};
