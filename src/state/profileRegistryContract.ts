import { atom, selector } from "recoil";
import { uint256ToNumber } from "src/utils/uint256";
import { ContractInterface } from "starknet";
import { Uint256 } from "starknet/dist/utils/uint256";

import { accountAddressSelector, blockNumberAtom } from "./starknet";

interface UserInformation {
  profile_contract: string;
  contributor_id: Uint256;
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
    get(blockNumberAtom);

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

export const userContributorIdSelector = selector<number | undefined>({
  key: "userContributorId",
  get: ({ get }) => {
    const userInformation = get(userInformationSelector);

    return userInformation?.contributor_id ? uint256ToNumber(userInformation?.contributor_id) : undefined;
  },
});

export const isGithubRegisteredSelector = selector<boolean>({
  key: "isGithubRegistered",
  get: ({ get }) => {
    const userInformation = get(userInformationSelector);

    return !!userInformation?.identifiers.github && userInformation?.identifiers.github.toString() !== "0";
  },
});
