import { getSelectorFromName } from "starknet/dist/utils/hash";
import { TransactionManager } from "../transaction-manager";
import { WalletEventEmitter } from "../wallet-event-emitter";

interface ConnectData {
  address: string;
}

interface TransactionInteractionKey {
  contractAddress: string;
  method: string;
}

export class HeadlessWallet {
  #eventEmitter: WalletEventEmitter;
  #transactionManager: TransactionManager;

  constructor(eventEmitter: WalletEventEmitter, transactionManager: TransactionManager) {
    this.#eventEmitter = eventEmitter;
    this.#transactionManager = transactionManager;
  }

  connect(data: ConnectData) {
    this.#eventEmitter.emit("connect", data);
  }

  autoConnect(data: ConnectData) {
    this.#eventEmitter.emit("autoConnect", data);
  }

  acceptTransaction({ contractAddress, method }: TransactionInteractionKey) {
    const methodSelector = getSelectorFromName(method);
    const hash = (parseInt(contractAddress, 16) + parseInt(methodSelector, 16)).toString(16);
    this.#transactionManager.acceptTransaction(hash);
  }

  rejectTransaction({ contractAddress, method }: TransactionInteractionKey, reason = "Reject") {
    const methodSelector = getSelectorFromName(method);
    const hash = (parseInt(contractAddress, 16) + parseInt(methodSelector, 16)).toString(16);
    this.#transactionManager.rejectTransaction(hash);
  }
}
