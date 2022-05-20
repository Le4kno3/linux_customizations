import BigNumber from "bignumber.js";
import { Finding, FindingSeverity, FindingType } from "forta-agent";
import { USDT_ADDRESS, USDT_DECIMALS, ERC20_TRANSFER_FROM_FUNCTION } from "./constants";

function provideHandleTransaction() {
  return async function handleTransaction(txEvent) {
    const findings = [];

    // filter the transaction input for USDT transferFrom function calls
    const usdtTransferFromInvocations = txEvent.filterFunction(
      ERC20_TRANSFER_FROM_FUNCTION,
      USDT_ADDRESS
    );

    // fire alerts for each function call
    usdtTransferFromInvocations.forEach((transferFromInvocation) => {
      // shift decimal places of transfer amount
      const amount = new BigNumber(
        transferFromInvocation.args.value.toString()
      ).dividedBy(10 ** USDT_DECIMALS);

      const formattedAmount = amount.toFixed(2);
      findings.push(
        Finding.fromObject({
          name: "Tether Delegate Transfer",
          description: `${formattedAmount} USDT transferred`,
          alertId: "FORTA-8",
          severity: FindingSeverity.Info,
          type: FindingType.Info,
          metadata: {
            by: txEvent.from,
            from: transferFromInvocation.args.from,
            to: transferFromInvocation.args.to,
            amount: formattedAmount,
          },
        })
      );
    });

    return findings;
  };
}

export default {
  provideHandleTransaction,
  handleTransaction: provideHandleTransaction(),
};
