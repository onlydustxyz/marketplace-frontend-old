import { AccountInterface, ProviderInterface } from "starknet";
import {
  Connector,
  ConnectorNotConnectedError,
  ConnectorNotFoundError,
  UserNotConnectedError,
  UserRejectedRequestError,
} from "@starknet-react/core";

/** Injected connector options. */
export interface InjectedConnectorOptions {
  /** The wallet id. */
  id: string;
}

/** Wallet event type. */
export type EventType = "accountsChanged" | "networkChanged";

/** Wallet event handler. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type EventHandler = (data: any) => void;

/** Interface implemented by all injected starknet wallets. */
export interface IStarknetWindowObject {
  enable: (options?: { showModal?: boolean; starknetVersion?: "v3" | "v4" }) => Promise<string[]>;
  isPreauthorized: () => Promise<boolean>;
  on: (event: EventType, handleEvent: EventHandler) => void;
  off: (event: EventType, handleEvent: EventHandler) => void;

  id: string;
  name: string;
  version: string;
  icon: string;
  provider: ProviderInterface;
  isConnected: boolean;
  account: AccountInterface;
  selectedAddress?: string;
}

export class CustomInjectedConnector extends Connector<InjectedConnectorOptions> {
  private _wallet?: IStarknetWindowObject;
  private _installedWallets: IStarknetWindowObject[] = [];

  constructor({ options }: { options: InjectedConnectorOptions }, installedWallets: IStarknetWindowObject[]) {
    super({ options });

    this._installedWallets = installedWallets;
    this.ensureWallet();
  }

  available(): boolean {
    this.ensureWallet();
    return this._wallet !== undefined;
  }

  async ready(): Promise<boolean> {
    this.ensureWallet();

    if (!this._wallet) return false;
    return await this._wallet.isPreauthorized();
  }

  async connect(): Promise<AccountInterface> {
    this.ensureWallet();

    if (!this._wallet) {
      throw new ConnectorNotFoundError();
    }

    try {
      await this._wallet.enable({ starknetVersion: "v4" });
    } catch {
      // NOTE: Argent v3.0.0 swallows the `.enable` call on reject, so this won't get hit.
      throw new UserRejectedRequestError();
    }

    if (!this._wallet.isConnected) {
      // NOTE: Argent v3.0.0 swallows the `.enable` call on reject, so this won't get hit.
      throw new UserRejectedRequestError();
    }

    return this._wallet.account;
  }

  async disconnect(): Promise<void> {
    this.ensureWallet();

    if (!this.available()) {
      throw new ConnectorNotFoundError();
    }

    if (!this._wallet?.isConnected) {
      throw new UserNotConnectedError();
    }
  }

  async account(): Promise<AccountInterface | null> {
    this.ensureWallet();

    if (!this._wallet) {
      throw new ConnectorNotConnectedError();
    }

    if (!this._wallet.account) {
      return null;
    }

    return this._wallet.account;
  }

  id(): string {
    return this.options.id;
  }

  name(): string {
    this.ensureWallet();

    if (!this._wallet) {
      throw new ConnectorNotConnectedError();
    }
    return this._wallet.name;
  }

  private ensureWallet() {
    const wallet = this._installedWallets.find(wallet => wallet.id === this.options.id);
    if (wallet) {
      this._wallet = wallet;
    }
  }
}
