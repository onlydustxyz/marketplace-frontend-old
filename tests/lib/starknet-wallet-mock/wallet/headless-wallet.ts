import { WalletEventEmitter } from "../wallet-event-emitter";

interface ConnectData {
  address: string;
}

export class HeadlessWallet {
  #eventEmitter: WalletEventEmitter;

  constructor(eventEmitter: WalletEventEmitter) {
    this.#eventEmitter = eventEmitter;
  }

  connect(data: ConnectData) {
    this.#eventEmitter.emit("connect", data);
  }
}
