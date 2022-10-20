import { atom, selector } from "recoil";
import { ContributorAccountAddress } from "src/model/contributors/repository";
import { AccountInterface, addAddressPadding, ProviderInterface } from "starknet";
import { StarknetChainId } from "starknet/dist/constants";

export const accountAtom = atom<AccountInterface | undefined>({
  key: "Account",
  default: undefined,
});

export const starknetChainIdAtom = atom<StarknetChainId | undefined>({
  key: "StarknetChainId",
  default: undefined,
});

export const providerAtom = atom<ProviderInterface | undefined>({
  key: "StarknetProvider",
  default: undefined,
});

export const contributorAccountAddressSelector = selector({
  key: "AccountAddress",
  get: ({ get }) => {
    const account = get(accountAtom);

    if (!account?.address) {
      return undefined;
    }

    return addAddressPadding(account.address) as ContributorAccountAddress;
  },
});

export const blockNumberAtom = atom<string>({
  key: "starknet_blockNumber",
  default: "0",
});
