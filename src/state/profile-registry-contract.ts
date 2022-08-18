import BN from "bn.js";
import { atom, selector } from "recoil";
import { ContributorId } from "src/model/contact-information/repository";
import { uint256ToNumber } from "src/utils/uint256";
import { ContractInterface } from "starknet";
import { Uint256 } from "starknet/dist/utils/uint256";

import { accountAddressSelector, blockNumberAtom } from "./starknet";

interface UserInformation {
  profile_contract: BN;
  contributor_id: Uint256;
  identifiers: {
    github: BN;
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

export const userContributorIdSelector = selector<ContributorId | undefined>({
  key: "userContributorId",
  get: ({ get }) => {
    const userInformation = get(userInformationSelector);

    return userInformation?.contributor_id !== undefined
      ? (uint256ToNumber(userInformation?.contributor_id) as ContributorId)
      : undefined;
  },
});

export const userGithubHandleSelector = selector<number | undefined>({
  key: "userGithubHandle",
  get: ({ get }) => {
    const userInformation = get(userInformationSelector);

    return userInformation?.identifiers.github && userInformation?.identifiers.github.toString() !== "0"
      ? userInformation?.identifiers.github.toNumber()
      : undefined;
  },
});

export const isGithubRegisteredSelector = selector<boolean>({
  key: "isGithubRegistered",
  get: ({ get }) => {
    const userInformation = get(userInformationSelector);

    return !!userInformation?.identifiers.github && userInformation?.identifiers.github.toString() !== "0";
  },
});
