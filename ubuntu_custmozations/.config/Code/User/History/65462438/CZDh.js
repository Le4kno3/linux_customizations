//importing modules from forta JS SDK
const { Finding, FindingSeverity, FindingType } = require("forta-agent");


const ERC20_TRANSFER_EVENT =
  "event Transfer(address indexed from, address indexed to, uint256 value)";
const TETHER_ADDRESS = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
const TETHER_DECIMALS = 6;
let findingsCount = 0;

//"txEvent" = "TransactionEvent" - is like new transactions being supplied to the detection bot.

//handleTransaction defined how a new transaction is processed.
const handleTransaction = async (txEvent) => {  //executes a function which takes "txEvent" as argument
  
  //findings stores alerts.
  const findings = [];

  // STOP bot processing
  // limiting this agent to emit only 5 findings so that the alert feed is not spammed
  if (findingsCount >= 5) return findings;

  // filter the transaction logs for Tether (USDT) token transfer events only.
  const tetherTransferEvents = txEvent.filterLog(
    ERC20_TRANSFER_EVENT,
    TETHER_ADDRESS
  );
  
  //For each Tether (USDT) token transfer event, do...
  tetherTransferEvents.forEach((transferEvent) => {
    // console.log(transferEvent)
    // extract transfer event arguments
    const { to, from, value } = transferEvent.args;
    
    // shift decimals of transfer value
    //value=0x4a817c8000, now value=320000000000 (decimals)
    const normalizedValue = value.div(10 ** TETHER_DECIMALS);

    
    // if more than 10,000 Tether were transferred, report it
    if (normalizedValue.gt(10000)) {
      findings.push(
        Finding.fromObject({
          name: "High Tether Transfer",
          description: `High amount of USDT transferred: ${normalizedValue}`,
          alertId: "FORTA-1",
          severity: FindingSeverity.Low,
          type: FindingType.Info,
          metadata: {
            to,
            from,
            value,
            normalizedValue
          },
        })
      );
      findingsCount++;
    }
  });

  return findings;
};

// const handleBlock = async (blockEvent) => {
//   const findings = [];
//   // detect some block condition
//   return findings;
// };

module.exports = {
  handleTransaction,
  // handleBlock,
  // ERC20_TRANSFER_EVENT, // exported for unit tests
  // TETHER_ADDRESS, // exported for unit tests
  // TETHER_DECIMALS, // exported for unit tests
};
