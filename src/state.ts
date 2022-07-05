import { selector, selectorFamily } from "recoil";
import { repository } from "src/model/contributions/repository";

export const contributionsQuery = selector({
  key: "Contributions",
  get: async () => {
    const contributions = await repository.list();
    return contributions;
  },
});

export const contributionQuery = selectorFamily({
  key: "Contribution",
  get:
    id =>
    ({ get }) => {
      const contributions = get(contributionsQuery);
      return contributions.find(contribution => contribution.id === id);
    },
});

export const projectQuery = selectorFamily({
  key: "Project",
  get:
    id =>
    ({ get }) => {
      const contributions = get(contributionsQuery);
      return contributions.find(contribution => contribution.project.id === id)?.project;
    },
});
