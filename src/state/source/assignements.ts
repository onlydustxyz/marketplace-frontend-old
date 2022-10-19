import { selector } from "recoil";
import { AssignementDto, AssignementStatusDtoEnum } from "src/model/assingments";

import { assignementRepository } from "src/model/assingments";

import { rawContributorQuery } from "./contributor";

export const rawAssignementsQuery = selector<AssignementDto[]>({
  key: "AssignementsState",
  get: async () => {
    const rawAssignements = await assignementRepository.list();

    return rawAssignements;
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

    return assignements.filter(assignement => {
      return (
        assignement.status === AssignementStatusDtoEnum.COMPLETED &&
        assignement.contributor_account_address === contributor?.account
      );
    });
  },
});

export const completedAssignementsAmountState = selector({
  key: "CompletedAssignementsAmountState",
  get: ({ get }) => {
    const completedAssignements = get(contributorCompletedAssignementsState);

    return completedAssignements.length;
  },
});
