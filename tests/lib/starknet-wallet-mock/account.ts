/* eslint-disable @typescript-eslint/no-unused-vars */
import { BN } from "bn.js";
import {
  Abi,
  AccountInterface,
  Call,
  EstimateFeeDetails,
  EstimateFeeResponse,
  InvocationsDetails,
  InvokeFunctionResponse,
  Signature,
  Signer,
  SignerInterface,
} from "starknet";
import { TypedData } from "starknet/dist/utils/typedData";
import { BigNumberish } from "starknet/utils/number";
import { MockProvider } from "./provider";

export class MockAccount extends MockProvider implements AccountInterface {
  public address: string;
  public signer: SignerInterface;

  constructor(address: string) {
    super();
    this.signer = new Signer();
    this.address = address;
  }

  async execute(
    transactions: Call | Call[],
    abis?: Abi[],
    transactionsDetail?: InvocationsDetails
  ): Promise<InvokeFunctionResponse> {
    return { transaction_hash: "" };
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
