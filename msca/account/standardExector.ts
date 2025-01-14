import type { SmartContractAccount } from "@alchemy/aa-core";
import { encodeFunctionData } from "viem";
import { IStandardExecutorAbi } from "../abis/IStandardExecutor";

export const standardExecutor: Pick<
  SmartContractAccount,
  "encodeExecute" | "encodeBatchExecute"
> = {
  encodeExecute: async ({ target, data, value }) => {
    return encodeFunctionData({
      abi: IStandardExecutorAbi,
      functionName: "execute",
      args: [target, value ?? BigInt(0), data],
    });
  },
  encodeBatchExecute: async (txs) => {
    return encodeFunctionData({
      abi: IStandardExecutorAbi,
      functionName: "executeBatch",
      args: [
        txs.map((tx) => ({
          target: tx.target,
          data: tx.data,
          value: tx.value ?? BigInt(0),
        })),
      ],
    });
  },
};