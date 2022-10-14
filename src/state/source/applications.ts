import { selector, selectorFamily } from "recoil";
import { applicationRepository } from "src/model/applications/repository";
import { ContributorId } from "src/model/contact-information/repository";
import { ContributionDto } from "src/model/contributions/repository";

import type { Contribution } from "./contributions";
import { rawContributorQuery } from "./contributor";

export type ContributionApplication = {
  contribution_id: Contribution["id"];
  contributor_id: ContributorId;
};

export const rawContributorApplicationsQuery = selector<ContributionApplication[]>({
  key: "ContributorApplications",
  get: async ({ get }) => {
    const contributor = get(rawContributorQuery);
    if (contributor === undefined) {
      return [];
    }

    const applications = await applicationRepository.list({ contributorId: contributor.id });

    return applications.map(application => {
      return {
        contribution_id: application.contribution_id,
        contributor_id: application.contributor_id as ContributorId,
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
