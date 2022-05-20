import BigNumber from "bignumber.js";
import {
  Finding,
  HandleTransaction,
  TransactionEvent,
  FindingSeverity,
  FindingType
} from "forta-agent";

export const MEDIUM_GAS_THRESHOLD = "4000000";
export const HIGH_GAS_THRESHOLD = "6000000";

const getSeverity = (gasUsed: BigNumber): FindingSeverity => {
  if (gasUsed.isGreaterThanOrEqualTo(HIGH_GAS_THRESHOLD)) {
    return FindingSeverity.High;
  }
  if (gasUsed.isGreaterThanOrEqualTo(MEDIUM_GAS_THRESHOLD)) {
    return FindingSeverity.Medium;
  }
  return FindingSeverity.Unknown;
};

const handleTransaction: HandleTransaction = async (
  txEvent: TransactionEvent
) => {
  const findings: Finding[] = [];

  if (txEvent.gasUsed === undefined || txEvent.gasUsed === null) {
    return findings;
  }

  const gasUsed = new BigNumber(txEvent.gasUsed);

  if (gasUsed.isLessThan(MEDIUM_GAS_THRESHOLD)) {
    return findings;
  }

  findings.push(
    Finding.fromObject({
      name: "High Gas Use Detection",
      description: `Gas Used by Transaction`,
      alertId: "NETHFORTA-1",
      severity: getSeverity(gasUsed),
      type: FindingType.Suspicious,
      metadata: {
        gas: gasUsed.toString()
      }
    })
  );

  return findings;
};

export default {
  handleTransaction
};


// import {
//   BlockEvent,
//   Finding,
//   HandleBlock,
//   HandleTransaction,
//   TransactionEvent,
//   FindingSeverity,
//   FindingType,
// } from "forta-agent";

// export const ERC20_TRANSFER_EVENT =
//   "event Transfer(address indexed from, address indexed to, uint256 value)";
// export const TETHER_ADDRESS = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
// export const TETHER_DECIMALS = 6;
// let findingsCount = 0;

// const handleTransaction: HandleTransaction = async (
//   txEvent: TransactionEvent
// ) => {
//   const findings: Finding[] = [];

//   // limiting this agent to emit only 5 findings so that the alert feed is not spammed
//   if (findingsCount >= 5) return findings;

//   // filter the transaction logs for Tether transfer events
//   const tetherTransferEvents = txEvent.filterLog(
//     ERC20_TRANSFER_EVENT,
//     TETHER_ADDRESS
//   );

//   tetherTransferEvents.forEach((transferEvent) => {
//     // extract transfer event arguments
//     const { to, from, value } = transferEvent.args;
//     // shift decimals of transfer value
//     const normalizedValue = value.div(10 ** TETHER_DECIMALS);

//     // if more than 10,000 Tether were transferred, report it
//     if (normalizedValue.gt(10000)) {
//       findings.push(
//         Finding.fromObject({
//           name: "High Tether Transfer",
//           description: `High amount of USDT transferred: ${normalizedValue}`,
//           alertId: "FORTA-1",
//           severity: FindingSeverity.Low,
//           type: FindingType.Info,
//           metadata: {
//             to,
//             from,
//           },
//         })
//       );
//       findingsCount++;
//     }
//   });

//   return findings;
// };

// // const handleBlock: HandleBlock = async (blockEvent: BlockEvent) => {
// //   const findings: Finding[] = [];
// //   // detect some block condition
// //   return findings;
// // }

// export default {
//   handleTransaction,
//   // handleBlock
// };
