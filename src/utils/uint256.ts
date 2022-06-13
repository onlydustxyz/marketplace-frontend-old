import { Uint256, uint256ToBN } from "starknet/dist/utils/uint256";

export function uint256ToNumber(value: Uint256) {
  return uint256ToBN(value).toString(10);
}
