import { selector } from "recoil";
import { AssignementDto, AssignementStatusDto } from "src/model/assingments/repository";

import { ContributionStatusEnumDto } from "src/model/contributions/repository";

import { rawContributionsQuery } from "./contributions";
import { rawContributorQuery } from "./contributor";

export const rawAssignementsQuery = selector<AssignementDto[]>({
  key: "AssignementsState",
  get: async ({ get }) => {
    const contributionsDto = get(rawContributionsQuery);

    return contributionsDto.reduce((allAssignements, contribution) => {
      if (
        contribution.status === ContributionStatusEnumDto.ASSIGNED ||
        contribution.status === ContributionStatusEnumDto.COMPLETED
      ) {
        return [
          ...allAssignements,
          {
            contribution_id: contribution.id,
            contributor_account_address: contribution.metadata.assignee,
            status:
              contribution.status === ContributionStatusEnumDto.COMPLETED
                ? AssignementStatusDto.COMPLETED
                : AssignementStatusDto.IN_PROGRESS,
          },
        ];
      }
      return allAssignements;
    }, [] as AssignementDto[]);
  },
});

export const rawAssignementsByContributions = selector({
  key: "RawAssignementByContribution",
  get: ({ get }) => {
    const rawAssignements = get(rawAssignementsQuery);

    return rawAssignements.reduce((aggregate, rawAssignement) => {
      return {
        ...aggregate,
        [rawAssignement.contribution_id]: [...(aggregate[rawAssignement.contribution_id] || []), rawAssignement],
      };
    }, {} as Record<AssignementDto["contribution_id"], AssignementDto[]>);
  },
});

export const contributorCompletedAssignementsState = selector({
  key: "CompletedAssignementsState",
  get: ({ get }) => {
    const assignements = get(rawAssignementsQuery);
    const contributor = get(rawContributorQuery);

    return assignements.filter(
      assignement =>
        assignement.status === AssignementStatusDto.COMPLETED &&
        assignement.contributor_account_address === contributor?.account
    );
  },
});

export const completedAssignementsAmountState = selector({
  key: "CompletedAssignementsAmountState",
  get: ({ get }) => {
    const completedAssignements = get(contributorCompletedAssignementsState);

    return completedAssignements.length;
  },
});
