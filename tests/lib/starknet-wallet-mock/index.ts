import { StarknetObjectConfiguration, StarknetWindowObject } from "./starknet-window-object";
import { HeadlessWallet } from "./wallet";
import { WalletEventEmitter } from "./wallet-event-emitter";

export type WalletFactoryCreationParams = {
  windowPropertyName: string;
} & StarknetObjectConfiguration;

export * from "./account";
export * from "./provider";

export class HeadlessWalletFactory {
  public create(windowObj: Window, params: WalletFactoryCreationParams) {
    const eventEmitter = new WalletEventEmitter();

    const headlessWallet = new HeadlessWallet(eventEmitter);

    const windowObject = new StarknetWindowObject(eventEmitter, params);

    Object.defineProperty(windowObj, params.windowPropertyName, {
      configurable: true,

      value: windowObject,
      writable: false,
    });
    return headlessWallet;
  }
}
