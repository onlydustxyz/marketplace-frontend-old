import { selector } from "recoil";
import { ContributionStatusEnum, contributionsWithStatusState } from "./contributions";

export const myContributionsState = selector({
  key: "MyContributionsState",
  get: ({ get }) => {
    const contributions = get(contributionsWithStatusState);

    return contributions.filter(contribution =>
      [ContributionStatusEnum.APPLIED, ContributionStatusEnum.ASSIGNED, ContributionStatusEnum.COMPLETED].includes(
        contribution.status
      )
    );
  },
});
