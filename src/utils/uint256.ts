import { BN } from "bn.js";
import { bnToUint256, Uint256, uint256ToBN } from "starknet/dist/utils/uint256";

export function uint256ToString(value: Uint256) {
  return uint256ToBN(value).toString(10);
}

export function uint256ToNumber(value: Uint256) {
  return uint256ToBN(value).toNumber();
}

export function numberToUint256(value: number) {
  const bn = new BN(value);
  return bnToUint256(bn);
}
