import { atomFamily, selector } from "recoil";

import {
  ContributionContextEnum,
  ContributionDifficultyEnum,
  ContributionDurationEnum,
  ContributionMetadata,
  ContributionStatusEnum,
  ContributionTypeEnum,
} from "src/model/projects/repository";

import {
  completedContributionsQuery,
  Contribution,
  gatedContributionsQuery,
  ongoingContributionsQuery,
  openedContributionsQuery,
  Project,
} from "./repository";

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

export const contributionsFilterStatusAtom = atomFamily<Array<ContributionStatusEnum | "gated">, string>({
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
    const openedContributions = get(openedContributionsQuery);
    const gatedContributions = get(gatedContributionsQuery);
    const ongoingContributions = get(ongoingContributionsQuery);
    const completedContributions = get(completedContributionsQuery);

    const contributionsFilterContext = get(contributionsFilterContextAtom("contributions"));
    const contributionsFilterDifficulty = get(contributionsFilterDifficultyAtom("contributions"));
    const contributionsFilterDuration = get(contributionsFilterDurationAtom("contributions"));
    const contributionsFilterProject = get(contributionsFilterProjectAtom("contributions"));
    const contributionsFilterStatus = get(contributionsFilterStatusAtom("contributions"));
    const contributionsFilterTechnology = get(contributionsFilterTechnologyAtom("contributions"));
    const contributionsFilterType = get(contributionsFilterTypeAtom("contributions"));

    const allContributions = [
      ...openedContributions,
      ...gatedContributions,
      ...ongoingContributions,
      ...completedContributions,
    ];

    return allContributions
      .filter(filterContributionByStatuses(contributionsFilterStatus))
      .filter(filterContributionByProject(contributionsFilterProject))
      .filter(filterContributionByMetadata("context", contributionsFilterContext))
      .filter(filterContributionByMetadata("difficulty", contributionsFilterDifficulty))
      .filter(filterContributionByMetadata("duration", contributionsFilterDuration))
      .filter(filterContributionByMetadata("technology", contributionsFilterTechnology))
      .filter(filterContributionByMetadata("type", contributionsFilterType));
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

function filterContributionByProject(projectIds: Array<Project["id"]>) {
  return (contribution: Contribution) => {
    if (projectIds.length === 0) {
      return true;
    }

    return projectIds.includes(contribution.project.id);
  };
}

function filterContributionByMetadata(
  metadataName: keyof ContributionMetadata,
  filteredValues: Array<ContributionMetadata[typeof metadataName]>
) {
  return (contribution: Contribution) => {
    if (filteredValues.length === 0) {
      return true;
    }

    if (!contribution.metadata[metadataName]) {
      return false;
    }

    return filteredValues.includes(contribution.metadata[metadataName]);
  };
}
