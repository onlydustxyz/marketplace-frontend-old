import { AccountInterface, ProviderInterface } from "starknet";
import { WalletEventEmitter } from "./wallet-event-emitter";

export interface StarknetObjectConfiguration {
  id: StarknetWindowObject["id"];
  name: StarknetWindowObject["name"];
  accountFactory: (address: string) => AccountInterface;
  provider: StarknetWindowObject["provider"];
}

interface RpcMessage {
  type: string;
  params: unknown;
  result: unknown;
}
export class StarknetWindowObject {
  #eventEmitter: WalletEventEmitter;
  #accountFactory: (address: string) => AccountInterface;

  id: string;
  name: string;
  selectedAddress = "";
  chainId = "";
  isConnected = false;
  account?: AccountInterface;
  provider: ProviderInterface;
  version = "0.0.1";
  icon = "";

  constructor(eventEmitter: WalletEventEmitter, config: StarknetObjectConfiguration) {
    this.#eventEmitter = eventEmitter;

    this.id = config.id;
    this.name = config.name;
    this.provider = config.provider;
    this.#accountFactory = config.accountFactory;
  }

  async enable() {
    console.info('Wait for a call to `window.headlessWallet.connect({ address: "0x0000...0000" })`');
    const data = await this.#eventEmitter.waitFor("connect");

    this.selectedAddress = data.address;
    this.isConnected = true;

    try {
      this.account = this.#accountFactory(data.address);
    } catch (err) {
      console.warn(err);
    }

    return data;
  }

  async request(call: RpcMessage) {
    console.log("request", call);
  }

  async isPreauthorized() {
    return false;
  }

  on(event: string, handleEvent: (args: unknown[]) => void) {
    console.log(`on(${event}, ${handleEvent.name})`);
  }
  off(event: string, handleEvent: (args: unknown[]) => void) {
    console.log(`off(${event}, ${handleEvent.name})`);
  }
}
