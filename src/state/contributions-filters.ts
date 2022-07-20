import { atom, selector } from "recoil";

import { Contribution, ContributionStatusEnum } from "src/model/contributions/repository";
import {
  completedContributionsQuery,
  gatedContributionsQuery,
  ongoingContributionsQuery,
  openedContributionsQuery,
} from "./repository";

export const contributionsFilterStatusAtom = atom<Array<ContributionStatusEnum | "gated">>({
  key: "ContributionsFilterStatus",
  default: [],
});

export const filteredContributionsSelector = selector({
  key: "FilteredContributions",

  get: ({ get }) => {
    const openedContributions = get(openedContributionsQuery);
    const gatedContributions = get(gatedContributionsQuery);
    const ongoingContributions = get(ongoingContributionsQuery);
    const completedContributions = get(completedContributionsQuery);

    const contributionsFilterStatus = get(contributionsFilterStatusAtom);

    const allContributions = [
      ...openedContributions,
      ...gatedContributions,
      ...ongoingContributions,
      ...completedContributions,
    ];

    return allContributions.filter(filterContributionByStatuses(contributionsFilterStatus));
  },
});

function filterContributionByStatuses(statuses: Array<ContributionStatusEnum | "gated">) {
  return (contribution: Contribution) => {
    if (statuses.length === 0) {
      return true;
    }

    if (contribution.status === ContributionStatusEnum.OPEN && contribution.eligible === false) {
      return statuses.includes("gated");
    }

    return statuses.includes(contribution.status);
  };
}
