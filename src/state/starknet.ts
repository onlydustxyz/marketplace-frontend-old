import { atom, selector } from "recoil";
import { AccountInterface } from "starknet";

export const accountAtom = atom<AccountInterface | undefined>({
  key: "Account",
  default: undefined,
});

export const accountAddressSelector = selector({
  key: "AccountAddress",
  get: ({ get }) => {
    const account = get(accountAtom);

    return account?.address;
  },
});
