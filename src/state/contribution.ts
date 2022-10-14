import { selectorFamily } from "recoil";
import { contributionsWithStatusState } from "./contributions";

export const contributionQuery = selectorFamily({
  key: "Contribution",
  get:
    id =>
    ({ get }) => {
      const contributions = get(contributionsWithStatusState);
      return contributions.find(contribution => contribution.id === id);
    },
});
