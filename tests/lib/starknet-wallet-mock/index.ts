import { MockAccount } from "./account";
import { MockProvider } from "./provider";
import { StarknetObjectConfiguration, StarknetWindowObject } from "./starknet-window-object";
import { TransactionManager } from "./transaction-manager";
import { HeadlessWallet } from "./wallet";
import { WalletEventEmitter } from "./wallet-event-emitter";

export type WalletFactoryCreationParams = {
  windowPropertyName: string;
} & Omit<StarknetObjectConfiguration, "accountFactory" | "provider">;

export * from "./account";
export * from "./provider";

export class HeadlessWalletFactory {
  public create(windowObj: Window, params: WalletFactoryCreationParams) {
    const eventEmitter = new WalletEventEmitter();
    const transactionManager = new TransactionManager();

    const headlessWallet = new HeadlessWallet(eventEmitter, transactionManager);

    const windowObject = new StarknetWindowObject(eventEmitter, params);

    Object.defineProperty(windowObj, params.windowPropertyName, {
      configurable: false,
      get: () => windowObject,
      set: () => {
        return;
      },
    });
    return headlessWallet;
  }
}
