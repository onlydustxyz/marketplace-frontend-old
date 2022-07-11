import { selector, selectorFamily } from "recoil";
import {
  AssignedContribution,
  CompletedContribution,
  ContributionStatusEnum,
  OpenContribution,
  repository,
} from "src/model/contributions/repository";
import { accountAddressSelector } from "./starknet";

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
    return contributions.filter(
      contribution => contribution.status === ContributionStatusEnum.OPEN
    ) as OpenContribution[];
  },
});

export const myOngoingContributionsQuery = selector({
  key: "MyOngoingContributions",
  get: ({ get }) => {
    const accountAddress = get(accountAddressSelector);
    const contributions = get(contributionsQuery);
    return contributions.filter(
      contribution =>
        contribution.status === ContributionStatusEnum.ASSIGNED && contribution.metadata.assignee === accountAddress
    ) as AssignedContribution[];
  },
});

export const foreignOngoingContributionsQuery = selector({
  key: "ForeignOngoingContributions",
  get: ({ get }) => {
    const accountAddress = get(accountAddressSelector);
    const contributions = get(contributionsQuery);
    return contributions.filter(
      contribution =>
        contribution.status === ContributionStatusEnum.ASSIGNED && contribution.metadata.assignee !== accountAddress
    ) as AssignedContribution[];
  },
});

export const myCompletedContributionsQuery = selector({
  key: "MyCompletedContributions",
  get: ({ get }) => {
    const accountAddress = get(accountAddressSelector);
    const contributions = get(contributionsQuery);
    return contributions.filter(
      contribution =>
        contribution.status === ContributionStatusEnum.COMPLETED && contribution.metadata.assignee === accountAddress
    ) as CompletedContribution[];
  },
});

export const foreignCompletedContributionsQuery = selector({
  key: "ForeignCompletedContributions",
  get: ({ get }) => {
    const accountAddress = get(accountAddressSelector);
    const contributions = get(contributionsQuery);
    return contributions.filter(
      contribution =>
        contribution.status === ContributionStatusEnum.COMPLETED && contribution.metadata.assignee !== accountAddress
    ) as CompletedContribution[];
  },
});
