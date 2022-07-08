import { atom, selector } from "recoil";
import { ContractInterface } from "starknet";
import { Uint256 } from "starknet/dist/utils/uint256";

import { accountAddressSelector } from "./starknet";

interface UserInformation {
  badge_contract: string;
  token_id: Uint256;
  identifiers: {
    github: string;
  };
}

export const profileRegistryContractAtom = atom<ContractInterface | undefined>({
  key: "ProfileRegistryContract",
  default: undefined,
});

export const userInformationSelector = selector({
  key: "UserInformation",
  get: async ({ get }) => {
    const profileRegistryContract = get(profileRegistryContractAtom);
    const accountAddress = get(accountAddressSelector);

    if (!profileRegistryContract || !accountAddress) {
      return undefined;
    }

    try {
      const res = (await profileRegistryContract.call("get_user_information", [accountAddress])) as [UserInformation];

      return res[0];
    } catch (error) {
      console.warn(error);
    }

    return undefined;
  },
});

export const isGithubRegisteredSelector = selector<boolean>({
  key: "isrGithubRegistered",
  get: ({ get }) => {
    const userInformation = get(userInformationSelector);

    return !!userInformation?.identifiers.github;
  },
});
