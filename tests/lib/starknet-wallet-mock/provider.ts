/* eslint-disable @typescript-eslint/no-unused-vars */
import { BN } from "bn.js";
import {
  Call,
  CallContractResponse,
  ContractClass,
  DeclareContractPayload,
  DeclareContractResponse,
  DeployContractPayload,
  DeployContractResponse,
  EstimateFeeResponse,
  GetBlockResponse,
  GetCodeResponse,
  GetTransactionReceiptResponse,
  GetTransactionResponse,
  Invocation,
  InvocationsDetails,
  InvokeFunctionResponse,
  ProviderInterface,
} from "starknet";
import { StarknetChainId } from "starknet/dist/constants";
import { BlockIdentifier } from "starknet/dist/provider/utils";
import { BigNumberish } from "starknet/utils/number";
import { TransactionManager } from "./transaction-manager";

export class MockProvider extends ProviderInterface {
  protected _transactionManager: TransactionManager;

  constructor(transactionManager: TransactionManager) {
    super();
    this._transactionManager = transactionManager;
  }

  get chainId() {
    return StarknetChainId.TESTNET;
  }

  async getBlock(blockIdentifier?: BlockIdentifier): Promise<GetBlockResponse> {
    return {
      block_hash: "0x5dd41a881305689ca71a3cc255ab10c0e25f83dca610dd6855997b4bfcfb573",
      block_number: 335509,
      new_root: "",
      parent_hash: "0x1a973950d0ea0018b41c52501351ce3009af19b8389f1c7a950df8c141f16df",
      status: "ACCEPTED_ON_L2",
      timestamp: 1663164379,
      transactions: [],
    };
  }

  async callContract(call: Call, blockIdentifier?: BlockIdentifier): Promise<CallContractResponse> {
    return { result: [] };
  }

  async getClassAt(contractAddress: string, blockIdentifier?: BlockIdentifier): Promise<ContractClass> {
    return {
      program: "",
      entry_points_by_type: {},
      abi: [],
    };
  }

  async getStorageAt(
    contractAddress: string,
    key: BigNumberish,
    blockIdentifier: BlockIdentifier
  ): Promise<BigNumberish> {
    return 0;
  }

  async getTransaction(transactionHash: BigNumberish): Promise<GetTransactionResponse> {
    return this._transactionManager.getTransaction(new BN(transactionHash, 16).toString(16));
  }

  async getTransactionReceipt(transactionHash: BigNumberish): Promise<GetTransactionReceiptResponse> {
    console.log("transactionHash", transactionHash);
    return this._transactionManager.getTransactionReceipt(new BN(transactionHash, 16).toString(16));
  }

  async deployContract(payload: DeployContractPayload): Promise<DeployContractResponse> {
    return {
      contract_address: "",
      transaction_hash: "",
    };
  }

  async declareContract(payload: DeclareContractPayload): Promise<DeclareContractResponse> {
    return {
      transaction_hash: "",
      class_hash: "",
    };
  }

  async getEstimateFee(
    invocation: Invocation,
    blockIdentifier: BlockIdentifier,
    details?: InvocationsDetails
  ): Promise<EstimateFeeResponse> {
    return {
      overall_fee: new BN(0),
      gas_consumed: new BN(0),
      gas_price: new BN(0),
    };
  }

  async waitForTransaction(txHash: BigNumberish, retryInterval?: number): Promise<void> {
    return;
  }

  /**
   * @deprecated The method should not be used
   */
  async getCode(contractAddress: string, blockIdentifier?: BlockIdentifier): Promise<GetCodeResponse> {
    return { bytecode: [] };
  }

  /**
   * @deprecated
   */
  async invokeFunction(invocation: Invocation, details?: InvocationsDetails): Promise<InvokeFunctionResponse> {
    return { transaction_hash: "" };
  }
}
