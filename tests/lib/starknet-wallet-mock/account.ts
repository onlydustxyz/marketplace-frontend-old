/* eslint-disable @typescript-eslint/no-unused-vars */
import { BN } from "bn.js";
import {
  Abi,
  AccountInterface,
  Call,
  EstimateFeeDetails,
  EstimateFeeResponse,
  GetTransactionResponse,
  InvocationsDetails,
  InvokeFunctionResponse,
  Signature,
  Signer,
  SignerInterface,
} from "starknet";
import { getSelectorFromName } from "starknet/dist/utils/hash";
import { TypedData } from "starknet/dist/utils/typedData";
import { BigNumberish } from "starknet/utils/number";
import { MockProvider } from "./provider";
import { TransactionManager } from "./transaction-manager";

export class MockAccount extends MockProvider implements AccountInterface {
  public address: string;
  public signer: SignerInterface;

  constructor(address: string, transactionManager: TransactionManager) {
    super(transactionManager);
    this.signer = new Signer();
    this.address = address;
  }

  async execute(
    transactions: Call | Call[],
    abis?: Abi[],
    transactionsDetail?: InvocationsDetails
  ): Promise<InvokeFunctionResponse> {
    if (Array.isArray(transactions)) {
      throw new Error("executing multiple transaction not implemented");
    }

    const methodSelector = getSelectorFromName(transactions.entrypoint);
    const transactionHash = (parseInt(transactions.contractAddress, 16) + parseInt(methodSelector, 16)).toString(16);

    const transaction: GetTransactionResponse = {
      contract_address: transactions.contractAddress,
      calldata: transactions.calldata?.map(el => el.toString(16)) || [],
      entry_point_selector: getSelectorFromName(transactions.entrypoint), // @TODO : format entrypoint
    };

    this._transactionManager.addTransaction(transactionHash, transaction);

    return { transaction_hash: transactionHash };
  }

  async estimateFee(calls: Call | Call[], estimateFeeDetails?: EstimateFeeDetails): Promise<EstimateFeeResponse> {
    return {
      overall_fee: new BN(0),
      gas_consumed: new BN(0),
      gas_price: new BN(0),
    };
  }

  async signMessage(typedData: TypedData): Promise<Signature> {
    return [];
  }

  async hashMessage(typedData: TypedData): Promise<string> {
    return "";
  }

  async verifyMessage(typedData: TypedData, signature: Signature): Promise<boolean> {
    return false;
  }

  async verifyMessageHash(hash: BigNumberish, signature: Signature): Promise<boolean> {
    return false;
  }

  async getNonce(): Promise<string> {
    return "";
  }
}
