import { atomFamily, selector } from "recoil";

import {
  ContributionContextEnum,
  ContributionDifficultyEnum,
  ContributionDurationEnum,
  ContributionMetadata,
  ContributionTypeEnum,
} from "src/model/projects/repository";

import { ContributionWithStatus, contributionsWithStatusState, ContributionStatusEnum } from "./contributions";
import { Project } from "./projects-list";
import { rawContributionsQuery } from "./source/contributions";
import { rawProjectsQuery } from "./source/projects";

export const contributionsFilterContextAtom = atomFamily<ContributionContextEnum[], string>({
  key: "ContributionsFilterContext",
  default: [],
});

export const contributionsFilterDifficultyAtom = atomFamily<ContributionDifficultyEnum[], string>({
  key: "ContributionsFilterDifficulty",
  default: [],
});

export const contributionsFilterDurationAtom = atomFamily<ContributionDurationEnum[], string>({
  key: "ContributionsFilterDuration",
  default: [],
});

export const contributionsFilterProjectAtom = atomFamily<string[], string>({
  key: "ContributionsFilterProject",
  default: [],
});

export const contributionsFilterStatusAtom = atomFamily<Array<ContributionStatusEnum>, string>({
  key: "ContributionsFilterStatus",
  default: [],
});

export const contributionsFilterTechnologyAtom = atomFamily<string[], string>({
  key: "ContributionsFilterTechnology",
  default: [],
});

export const contributionsFilterTypeAtom = atomFamily<ContributionTypeEnum[], string>({
  key: "ContributionsFilterType",
  default: [],
});

export const filteredContributionsSelector = selector({
  key: "FilteredContributions",

  get: ({ get }) => {
    const contributionsWithStatus = get(contributionsWithStatusState);

    const contributionsFilterContext = get(contributionsFilterContextAtom("contributions"));
    const contributionsFilterDifficulty = get(contributionsFilterDifficultyAtom("contributions"));
    const contributionsFilterDuration = get(contributionsFilterDurationAtom("contributions"));
    const contributionsFilterProject = get(contributionsFilterProjectAtom("contributions"));
    const contributionsFilterStatus = get(contributionsFilterStatusAtom("contributions"));
    const contributionsFilterTechnology = get(contributionsFilterTechnologyAtom("contributions"));
    const contributionsFilterType = get(contributionsFilterTypeAtom("contributions"));

    return contributionsWithStatus
      .filter(contribution => contribution.status !== ContributionStatusEnum.CLOSED)
      .filter(filterContributionByStatuses(contributionsFilterStatus))
      .filter(filterContributionByProject(contributionsFilterProject))
      .filter(filterContributionByMetadata("context", contributionsFilterContext))
      .filter(filterContributionByMetadata("difficulty", contributionsFilterDifficulty))
      .filter(filterContributionByMetadata("duration", contributionsFilterDuration))
      .filter(filterContributionByMetadata("technology", contributionsFilterTechnology))
      .filter(filterContributionByMetadata("type", contributionsFilterType));
  },
});

function filterContributionByStatuses(statuses: Array<ContributionStatusEnum>) {
  return (contribution: ContributionWithStatus) => {
    if (statuses.length === 0) {
      return true;
    }

    const finalStatuses = [...statuses];

    if (statuses.includes(ContributionStatusEnum.ASSIGNED)) {
      finalStatuses.push(ContributionStatusEnum.NO_SLOT);
    }

    if (statuses.includes(ContributionStatusEnum.COMPLETED)) {
      return finalStatuses.push(ContributionStatusEnum.FULFILLED);
    }

    return finalStatuses.includes(contribution.status);
  };
}

function filterContributionByProject(projectIds: Array<Project["id"]>) {
  return (contribution: ContributionWithStatus) => {
    if (projectIds.length === 0) {
      return true;
    }

    return projectIds.includes(contribution.project_id);
  };
}

function filterContributionByMetadata(
  metadataName: keyof ContributionMetadata,
  filteredValues: Array<ContributionMetadata[typeof metadataName]>
) {
  return (contribution: ContributionWithStatus) => {
    if (filteredValues.length === 0) {
      return true;
    }

    if (!contribution.metadata[metadataName]) {
      return false;
    }

    return filteredValues.includes(contribution.metadata[metadataName]);
  };
}

export type ProjectFilter = Array<{
  id: string;
  title: string;
}>;

export const projectFilter = selector<ProjectFilter>({
  key: "ProjectFilter",
  get: ({ get }) => {
    const rawProjects = get(rawProjectsQuery);

    return rawProjects;
  },
});

export const technologiesQuery = selector({
  key: "TechnologyFilter",
  get: ({ get }) => {
    const contributions = get(rawContributionsQuery);

    const technologies = new Set<string>();

    contributions.forEach(contribution => {
      if (contribution.metadata.technology && !technologies.has(contribution.metadata.technology)) {
        technologies.add(contribution.metadata.technology);
      }
    });

    return Array.from(technologies);
  },
});
