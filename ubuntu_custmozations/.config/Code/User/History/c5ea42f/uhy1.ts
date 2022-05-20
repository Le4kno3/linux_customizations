import {
  BlockEvent,
  EventType,
  Finding,
  FindingSeverity,
  FindingType,
  HandleBlock,
  Network,
  HandleTransaction,
  TransactionEvent
} from "forta-agent";
import agent, { MEDIUM_GAS_THRESHOLD, HIGH_GAS_THRESHOLD } from ".";

const createTxEvent = ({
  gasUsed,
  addresses,
  logs,
  blockNumber
}: any): TransactionEvent => {
  const tx = {} as any;
  const receipt = { gasUsed, logs } as any;
  const block = { number: blockNumber } as any;
  const eventAddresses = { ...addresses } as any;
  return new TransactionEvent(
    EventType.BLOCK,
    Network.MAINNET,
    tx,
    receipt,
    [],
    eventAddresses,
    block
  );
};

describe("multi gas threshold agent", () => {
  let handleTransaction: HandleTransaction;

  beforeAll(() => {
    handleTransaction = agent.handleTransaction;
  });

  describe("handleTransaction", () => {
    it("Returns empty findings if gas used is below lowest threshold", async () => {
      const txEvent: TransactionEvent = createTxEvent({ gasUsed: "500000" });
      const findings: Finding[] = await handleTransaction(txEvent);
      expect(findings).toStrictEqual([]);
    });

    it("Returns finding with severity Medium if gas used is between 1000000 and 3000000", async () => {
      const txEvent: TransactionEvent = createTxEvent({
        gasUsed: MEDIUM_GAS_THRESHOLD
      });
      const findings: Finding[] = await handleTransaction(txEvent);
      expect(findings).toStrictEqual([
        Finding.fromObject({
          name: "High Gas Use Detection",
          description: `Gas Used by Transaction`,
          alertId: "NETHFORTA-1",
          severity: FindingSeverity.Medium,
          type: FindingType.Suspicious,
          metadata: {
            gas: MEDIUM_GAS_THRESHOLD
          }
        })
      ]);
    });

    it("Returns finding with severity High if gas used is greater than or equal to 3000000", async () => {
      const txEvent: TransactionEvent = createTxEvent({
        gasUsed: HIGH_GAS_THRESHOLD
      });
      const findings: Finding[] = await handleTransaction(txEvent);
      expect(findings).toStrictEqual([
        Finding.fromObject({
          name: "High Gas Use Detection",
          description: `Gas Used by Transaction`,
          alertId: "NETHFORTA-1",
          severity: FindingSeverity.High,
          type: FindingType.Suspicious,
          metadata: {
            gas: HIGH_GAS_THRESHOLD
          }
        })
      ]);
    });

    it("Returns empty findings if gasUsed is undefined", async () => {
      const txEvent: TransactionEvent = createTxEvent({});
      const findings: Finding[] = await handleTransaction(txEvent);
      expect(findings).toStrictEqual([]);
    });
  });
});

// import {
//   FindingType,
//   FindingSeverity,
//   Finding,
//   HandleTransaction,
//   createTransactionEvent,
//   ethers,
// } from "forta-agent";
// import agent, {
//   ERC20_TRANSFER_EVENT,
//   TETHER_ADDRESS,
//   TETHER_DECIMALS,
// } from "./agent";

// describe("high tether transfer agent", () => {
//   let handleTransaction: HandleTransaction;
//   const mockTxEvent = createTransactionEvent({} as any);

//   beforeAll(() => {
//     handleTransaction = agent.handleTransaction;
//   });

//   describe("handleTransaction", () => {
//     it("returns empty findings if there are no Tether transfers", async () => {
//       mockTxEvent.filterLog = jest.fn().mockReturnValue([]);

//       const findings = await handleTransaction(mockTxEvent);

//       expect(findings).toStrictEqual([]);
//       expect(mockTxEvent.filterLog).toHaveBeenCalledTimes(1);
//       expect(mockTxEvent.filterLog).toHaveBeenCalledWith(
//         ERC20_TRANSFER_EVENT,
//         TETHER_ADDRESS
//       );
//     });

//     it("returns a finding if there is a Tether transfer over 10,000", async () => {
//       const mockTetherTransferEvent = {
//         args: {
//           from: "0xabc",
//           to: "0xdef",
//           value: ethers.BigNumber.from("20000000000"), //20k with 6 decimals
//         },
//       };
//       mockTxEvent.filterLog = jest
//         .fn()
//         .mockReturnValue([mockTetherTransferEvent]);

//       const findings = await handleTransaction(mockTxEvent);

//       const normalizedValue = mockTetherTransferEvent.args.value.div(
//         10 ** TETHER_DECIMALS
//       );
//       expect(findings).toStrictEqual([
//         Finding.fromObject({
//           name: "High Tether Transfer",
//           description: `High amount of USDT transferred: ${normalizedValue}`,
//           alertId: "FORTA-1",
//           severity: FindingSeverity.Low,
//           type: FindingType.Info,
//           metadata: {
//             to: mockTetherTransferEvent.args.to,
//             from: mockTetherTransferEvent.args.from,
//           },
//         }),
//       ]);
//       expect(mockTxEvent.filterLog).toHaveBeenCalledTimes(1);
//       expect(mockTxEvent.filterLog).toHaveBeenCalledWith(
//         ERC20_TRANSFER_EVENT,
//         TETHER_ADDRESS
//       );
//     });
//   });
// });
