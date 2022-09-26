import { selector } from "recoil";
import { ContributorId } from "src/model/contact-information/repository";
import { contributorRepository } from "src/model/contributors/repository";

import { accountAddressSelector, blockNumberAtom } from "./starknet";

export const userInformationSelector = selector({
  key: "UserInformation",
  get: async ({ get }) => {
    get(blockNumberAtom);

    const accountAddress = get(accountAddressSelector);

    if (!accountAddress) {
      return undefined;
    }

    try {
      return contributorRepository.findByAccountAddress(accountAddress);
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

    return (userInformation?.id as ContributorId) || undefined;
  },
});

export const userGithubHandleSelector = selector<string | undefined>({
  key: "userGithubHandle",
  get: ({ get }) => {
    const userInformation = get(userInformationSelector);

    return userInformation?.github_identifier && userInformation?.github_identifier !== "0"
      ? userInformation?.github_identifier
      : undefined;
  },
});

export const isGithubRegisteredSelector = selector<boolean>({
  key: "isGithubRegistered",
  get: ({ get }) => {
    const userInformation = get(userInformationSelector);

    return !!userInformation?.github_identifier && userInformation?.github_identifier !== "0";
  },
});
