import { selector, selectorFamily } from "recoil";
import { applicationRepository } from "src/model/applications/repository";
import { ContributorAccountAddress } from "src/model/contact-information/repository";
import { ContributionDto } from "src/model/contributions/repository";

import type { Contribution } from "./contributions";
import { contributorAccountSelector } from "../starknet";

export type ContributionApplication = {
  contribution_id: Contribution["id"];
  contributor_account_address: ContributorAccountAddress;
};

export const rawContributorApplicationsQuery = selector<ContributionApplication[]>({
  key: "ContributorApplications",
  get: async ({ get }) => {
    const contributorAccountAddress = get(contributorAccountSelector);
    if (contributorAccountAddress === undefined) {
      return [];
    }

    const applications = await applicationRepository.list({ contributorAccountAddress });

    return applications.map(application => {
      return {
        contribution_id: application.contribution_id,
        contributor_account_address: application.contributor_account_address as ContributorAccountAddress,
      };
    });
  },
});

export const contributorApplicationForContribution = selectorFamily({
  key: "ContributorApplicationForContribution",
  get:
    (contributionId: ContributionDto["id"]) =>
    ({ get }) => {
      const rawContributorApplications = get(rawContributorApplicationsQuery);

      return rawContributorApplications.find(
        rawContributorApplication => rawContributorApplication.contribution_id === contributionId
      );
    },
});
