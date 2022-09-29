import { GetTransactionResponse, GetTransactionReceiptResponse, GetBlockResponse } from "starknet";
import { starknetKeccak } from "starknet/dist/utils/hash";

type TransactionData = GetTransactionReceiptResponse & {
  transaction: GetTransactionResponse;
  block_hash?: string;
  block_number?: number;
};

const firstBlock: GetBlockResponse = {
  block_hash: "0xccb839e7251b902b3627b21571e05aa0e86f78796ab845bd81627de657056c",
  parent_hash: "0x16b171610ff1bb37a85a7121d5939fb219c3b95a6576aa6548419c15ff37552",
  block_number: 0,
  new_root: "049e0ad4c4b75751c6d5382a73f05c146b94fc711dc3a9256fe4a37107a7dc81",
  status: "ACCEPTED_ON_L2",
  transactions: [],
  timestamp: 1664401871,
};

export class TransactionManager {
  #blockAuto = true;

  #blockNumber = firstBlock.block_number;
  #blocks: string[] = [firstBlock.block_hash];
  #blockByHash: Record<string, GetBlockResponse> = { [firstBlock.block_hash]: firstBlock };

  #transactionsToAccept = new Set<string>();
  #transactionsToReject = new Set<string>();

  #pendingTransactions: string[] = [];

  #transactions: Record<string, TransactionData> = {};

  getBlock(blockHash: string) {
    let hash = blockHash || undefined;

    if (!hash || hash === "pending") {
      hash = this.#blocks[this.#blocks.length - 1];
    }

    if (!this.#blockByHash[hash]) {
      throw new Error("Block not found");
    }

    return this.#blockByHash[hash];
  }

  mineBlock() {
    const newBlockNumber = this.#blockNumber + 1;
    const newBlockHash = starknetKeccak(newBlockNumber.toString(16)).toString();

    this.#pendingTransactions.forEach(transaction => {
      if (this.#transactionsToAccept.has(transaction)) {
        this.#transactions[transaction].status = "ACCEPTED_ON_L2";
        this.#transactions[transaction].block_number = newBlockNumber;
        this.#transactions[transaction].block_hash = newBlockHash;
      } else {
        this.#transactions[transaction].status = "REJECTED";
      }
    });

    const newAcceptedTransactions = Object.values(this.#transactions)
      .filter(transaction => transaction.status === "ACCEPTED_ON_L2")
      .reduce((accTransactions, transaction) => {
        return [...accTransactions, transaction.transaction_hash];
      }, [] as string[]);

    const newBlock: GetBlockResponse = {
      block_hash: newBlockHash,
      parent_hash: starknetKeccak(this.#blockNumber.toString(16)).toString(),
      block_number: newBlockNumber,
      new_root: "049e0ad4c4b75751c6d5382a73f05c146b94fc711dc3a9256fe4a37107a7dc81",
      status: "ACCEPTED_ON_L2",
      transactions: newAcceptedTransactions,
      timestamp: 1664401871,
    };

    this.#pendingTransactions = [];
    this.#blockByHash[newBlockHash] = newBlock;
    this.#blockNumber = newBlockNumber;
    this.#blocks.push(newBlockHash);
  }

  addTransaction(hash: string, data: GetTransactionResponse) {
    this.#transactions[hash] = {
      status: "RECEIVED",
      transaction: {
        ...data,
        transaction_hash: hash,
      },
      transaction_hash: hash,
    };
    this.#pendingTransactions.push(hash);

    return hash;
  }

  getTransaction(hash: string): GetTransactionResponse {
    if (!this.#transactions[hash]) {
      throw new Error("Transaction not found for hash " + hash);
    }

    return this.#transactions[hash].transaction;
  }

  getTransactionReceipt(hash: string): GetTransactionReceiptResponse {
    if (!this.#transactions[hash]) {
      throw new Error("Transaction not found for hash " + hash);
    }

    return this.#transactions[hash];
  }

  acceptTransaction(hash: string) {
    if (!this.#transactions[hash]) {
      throw new Error(`Transaction does not exist with hash ${hash}`);
    }

    this.#transactionsToAccept.add(hash);

    this.#blockAuto && this.mineBlock();
  }

  rejectTransaction(hash: string, reason: string) {
    if (!this.#transactions[hash]) {
      throw new Error(`Transaction does not exist with hash ${hash}`);
    }

    this.#transactionsToReject.add(hash);

    this.#blockAuto && this.mineBlock();
  }
}
