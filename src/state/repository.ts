import { selector, selectorFamily } from "recoil";
import {
  AssignedContribution,
  CompletedContribution,
  ContributionStatusEnum,
  OpenContribution,
  Project,
  repository,
} from "src/model/contributions/repository";
import { userContributorIdSelector } from "./profileRegistryContract";

export const contributionsQuery = selector({
  key: "Contributions",
  get: async ({ get }) => {
    const userContributorId = get(userContributorIdSelector);

    const contributions = await repository.list({ contributorId: userContributorId });
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

export const projectsQuery = selector({
  key: "Projects",
  get: ({ get }) => {
    const contributions = get(contributionsQuery);

    const addedProjectsId = new Set();
    const projects: Project[] = [];

    contributions.forEach(contribution => {
      const { project } = contribution;

      if (!addedProjectsId.has(project.id)) {
        addedProjectsId.add(project.id);
        projects.push(project);
      }
    });

    return projects;
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

export const projectContributionsQuery = selectorFamily({
  key: "ProjectContributions",
  get:
    projectId =>
    ({ get }) => {
      const contributions = get(contributionsQuery);
      return contributions.filter(contribution => contribution.project.id === projectId);
    },
});

export const openedContributionsQuery = selector({
  key: "OpenedContributions",
  get: ({ get }) => {
    const contributions = get(contributionsQuery);
    return contributions.filter(
      contribution => contribution.status === ContributionStatusEnum.OPEN && contribution.eligible !== false
    ) as OpenContribution[];
  },
});

export const gatedContributionsQuery = selector({
  key: "GatedContributions",
  get: ({ get }) => {
    const contributions = get(contributionsQuery);
    return contributions.filter(
      contribution => contribution.status === ContributionStatusEnum.OPEN && contribution.eligible === false
    ) as OpenContribution[];
  },
});

export const ongoingContributionsQuery = selector({
  key: "OngoingContributions",
  get: ({ get }) => {
    const contributions = get(contributionsQuery);
    return contributions.filter(
      contribution => contribution.status === ContributionStatusEnum.ASSIGNED
    ) as AssignedContribution[];
  },
});

export const myOngoingContributionsQuery = selector({
  key: "MyOngoingContributions",
  get: ({ get }) => {
    const userContributorId = get(userContributorIdSelector);
    const contributions = get(contributionsQuery);
    return contributions.filter(
      contribution =>
        contribution.status === ContributionStatusEnum.ASSIGNED &&
        contribution.metadata.assignee.toLowerCase() === `0x${userContributorId?.toString(16).toLowerCase()}`
    ) as AssignedContribution[];
  },
});

export const foreignOngoingContributionsQuery = selector({
  key: "ForeignOngoingContributions",
  get: ({ get }) => {
    const userContributorId = get(userContributorIdSelector);
    const contributions = get(contributionsQuery);
    return contributions.filter(
      contribution =>
        contribution.status === ContributionStatusEnum.ASSIGNED &&
        contribution.metadata.assignee.toLowerCase() !== `0x${userContributorId?.toString(16).toLowerCase()}`
    ) as AssignedContribution[];
  },
});

export const completedContributionsQuery = selector({
  key: "CompletedContributions",
  get: ({ get }) => {
    const contributions = get(contributionsQuery);
    return contributions.filter(
      contribution => contribution.status === ContributionStatusEnum.COMPLETED
    ) as CompletedContribution[];
  },
});

export const myCompletedContributionsQuery = selector({
  key: "MyCompletedContributions",
  get: ({ get }) => {
    const userContributorId = get(userContributorIdSelector);
    const contributions = get(contributionsQuery);
    return contributions.filter(
      contribution =>
        contribution.status === ContributionStatusEnum.COMPLETED &&
        contribution.metadata.assignee.toLowerCase() === `0x${userContributorId?.toString(16).toLowerCase()}`
    ) as CompletedContribution[];
  },
});

export const foreignCompletedContributionsQuery = selector({
  key: "ForeignCompletedContributions",
  get: ({ get }) => {
    const userContributorId = get(userContributorIdSelector);
    const contributions = get(contributionsQuery);
    return contributions.filter(
      contribution =>
        contribution.status === ContributionStatusEnum.COMPLETED &&
        contribution.metadata.assignee.toLowerCase() !== `0x${userContributorId?.toString(16).toLowerCase()}`
    ) as CompletedContribution[];
  },
});
