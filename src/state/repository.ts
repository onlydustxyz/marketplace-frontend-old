import { selector, selectorFamily } from "recoil";
import {
  AssignedContribution,
  CompletedContribution,
  OpenContribution,
  repository,
} from "src/model/contributions/repository";

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

export const openedContributionsQuery = selector({
  key: "OpenedContributions",
  get: ({ get }) => {
    const contributions = get(contributionsQuery);
    return contributions.filter(contribution => contribution.status === "open") as OpenContribution[];
  },
});

export const myOngoingContributionsQuery = selectorFamily({
  key: "MyOngoingContributions",
  get:
    myAddress =>
    ({ get }) => {
      const contributions = get(contributionsQuery);
      return contributions.filter(
        contribution => contribution.status === "assigned" && contribution.metadata.assignee === myAddress
      ) as AssignedContribution[];
    },
});

export const foreignOngoingContributionsQuery = selectorFamily({
  key: "ForeignOngoingContributions",
  get:
    myAddress =>
    ({ get }) => {
      const contributions = get(contributionsQuery);
      return contributions.filter(
        contribution => contribution.status === "assigned" && contribution.metadata.assignee !== myAddress
      ) as AssignedContribution[];
    },
});

export const myCompletedContributionsQuery = selectorFamily({
  key: "MyCompletedContributions",
  get:
    myAddress =>
    ({ get }) => {
      const contributions = get(contributionsQuery);
      return contributions.filter(
        contribution => contribution.status === "completed" && contribution.metadata.assignee === myAddress
      ) as CompletedContribution[];
    },
});

export const foreignCompletedContributionsQuery = selectorFamily({
  key: "ForeignCompletedContributions",
  get:
    myAddress =>
    ({ get }) => {
      const contributions = get(contributionsQuery);
      return contributions.filter(
        contribution => contribution.status === "completed" && contribution.metadata.assignee !== myAddress
      ) as CompletedContribution[];
    },
});
