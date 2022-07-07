import { atom } from "recoil";
import { AccountInterface } from "starknet";

export const accountAddressAtom = atom<string | undefined>({
  key: "AccountAddress",
  default: undefined,
});

export const accountAtom = atom<AccountInterface | undefined>({
  key: "Account",
  default: undefined,
});
