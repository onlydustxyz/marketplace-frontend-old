import { toBN } from "starknet/dist/utils/number";

export function decodeToNumber(value: string) {
  if (value === "0x800000000000011000000000000000000000000000000000000000000000000") {
    return -1;
  }

  return toBN(value).toNumber();
}
