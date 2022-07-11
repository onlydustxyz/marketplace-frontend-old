import { GetTransactionResponse, ProviderInterface } from "starknet";

export const waitForTransaction = (
  transactionHash: string,
  provider: ProviderInterface
): Promise<GetTransactionResponse> => {
  return new Promise((resolve, reject) => {
    const checkTransactionInterval = setInterval(async () => {
      const transaction = await provider.getTransaction(transactionHash);

      if (transaction.status === "ACCEPTED_ON_L2" || transaction.status === "ACCEPTED_ON_L1") {
        clearInterval(checkTransactionInterval);
        resolve(transaction);
      }

      if (transaction.status === "NOT_RECEIVED" || transaction.status === "REJECTED") {
        clearInterval(checkTransactionInterval);
        reject(transaction);
      }
    }, 2500);
  });
};
