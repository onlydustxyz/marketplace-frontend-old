import { AccountInterface } from "starknet";
import { getMessageHash } from "starknet/dist/utils/typedData";

export async function signMessage(account: AccountInterface, message: string, chainId: string) {
  const typedMessage = {
    domain: {
      name: "Deathnote",
      chainId,
      version: "0.0.1",
    },
    types: {
      StarkNetDomain: [
        { name: "name", type: "felt" },
        { name: "chainId", type: "felt" },
        { name: "version", type: "felt" },
      ],
      Message: [{ name: "message", type: "felt" }],
    },
    primaryType: "Message",
    message: {
      message,
    },
  };

  const hash = getMessageHash(typedMessage, account.address);

  return { hash: hash, signature: await account.signMessage(typedMessage) };
}
