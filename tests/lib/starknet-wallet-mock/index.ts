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

    const windowObject = new StarknetWindowObject(eventEmitter, {
      ...params,
      accountFactory: (address: string) => {
        return new MockAccount(address, transactionManager);
      },
      provider: new MockProvider(transactionManager),
    });

    Object.defineProperty(windowObj, params.windowPropertyName, {
      configurable: true,

      value: windowObject,
      writable: false,
    });
    return headlessWallet;
  }
}
