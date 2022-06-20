import { pedersen } from "starknet/dist/utils/hash";
import { encodeShortString } from "starknet/dist/utils/shortString";

export function encodeCode(code: string) {
  return pedersen([0, encodeShortString(code)]);
}
