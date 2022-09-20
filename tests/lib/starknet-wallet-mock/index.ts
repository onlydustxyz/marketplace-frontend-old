import { StarknetObjectConfiguration, StarknetWindowObject } from "./starknet-window-object";
import { HeadlessWallet } from "./wallet";
import { WalletEventEmitter } from "./wallet-event-emitter";
type WalletFactoryCreationParams = {
  windowPropertyName: string;
} & StarknetObjectConfiguration;

export * from "./account";
export * from "./provider";

export class HeadlessWalletFactory {
  public create(windowObj: Window, params: WalletFactoryCreationParams) {
    const eventEmitter = new WalletEventEmitter();

    const headlessWallet = new HeadlessWallet(eventEmitter);

    const windowObject = new StarknetWindowObject(eventEmitter, params);

    windowObj[params.windowPropertyName] = windowObject;

    return headlessWallet;
  }
}
