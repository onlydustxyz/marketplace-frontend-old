import { selector } from "recoil";

import { contributionRepository } from "src/model/contributions/repository";
import { buildContributionFormatter, ContributionStatusEnum, sortContributionsByStatus } from "./contributions";

import { contributorAccountSelector } from "./starknet";

export const myContributionsState = selector({
  key: "MyContributionsState",
  get: async ({ get }) => {
    const contributorAccountAddress = get(contributorAccountSelector);
    const myContributions = await contributionRepository.list({ contributorAccountAddress });

    const finalContributions = myContributions
      .map(buildContributionFormatter({ get }))
      .sort(sortContributionsByStatus)
      .filter(contribution => {
        return contribution.status !== ContributionStatusEnum.FULFILLED;
      });

    return finalContributions;
  },
});
