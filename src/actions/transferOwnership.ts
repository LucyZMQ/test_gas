import {
  AccountNotFoundError,
  IncompatibleClientError,
  isSmartAccountClient,
  type GetAccountParameter,
  type GetEntryPointFromAccount,
  type SmartAccountSigner,
  type UserOperationOverridesParameter,
} from "@alchemy/aa-core";
import type { Chain, Client, Hex, Transport } from "viem";
import type { MultiOwnerLightAccount } from "../accounts/multiOwner";

export type TransferLightAccountOwnershipParams<
  TSigner extends SmartAccountSigner = SmartAccountSigner,
  TAccount extends MultiOwnerLightAccount<TSigner> | undefined =
  | MultiOwnerLightAccount<TSigner>
  | undefined,
  TEntryPointVersion extends GetEntryPointFromAccount<TAccount> = GetEntryPointFromAccount<TAccount>
> = {
  newOwner: TSigner;
  waitForTxn?: boolean;
} & GetAccountParameter<TAccount, MultiOwnerLightAccount<TSigner>> &
  UserOperationOverridesParameter<TEntryPointVersion>;

export const transferOwnership: <
  TTransport extends Transport = Transport,
  TChain extends Chain | undefined = Chain | undefined,
  TSigner extends SmartAccountSigner = SmartAccountSigner,
  TAccount extends MultiOwnerLightAccount<TSigner> | undefined =
  | MultiOwnerLightAccount<TSigner>
  | undefined
>(
  client: Client<TTransport, TChain, TAccount>,
  args: TransferLightAccountOwnershipParams<TSigner, TAccount>
) => Promise<Hex> = async (
  client,
  { newOwner, waitForTxn, overrides, account = client.account }
) => {
    if (!account) {
      throw new AccountNotFoundError();
    }

    if (!isSmartAccountClient(client)) {
      throw new IncompatibleClientError(
        "SmartAccountClient",
        "transferOwnership",
        client
      );
    }

    const data = account.encodeTransferOwnership(await newOwner.getAddress());

    const result = await client.sendUserOperation({
      uo: {
        target: account.address,
        data,
      },
      account,
      overrides,
    });

    if (waitForTxn) {
      return client.waitForUserOperationTransaction(result);
    }

    return result.hash;
  };