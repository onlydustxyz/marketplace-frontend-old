import { atom, selector } from "recoil";

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

export const contributionsFilterContextAtom = atom<ContributionContextEnum[]>({
  key: "ContributionsFilterContext",
  default: [],
});

export const contributionsFilterDifficultyAtom = atom<ContributionDifficultyEnum[]>({
  key: "ContributionsFilterDifficulty",
  default: [],
});

export const contributionsFilterDurationAtom = atom<ContributionDurationEnum[]>({
  key: "ContributionsFilterDuration",
  default: [],
});

export const contributionsFilterProjectAtom = atom<string[]>({
  key: "ContributionsFilterProject",
  default: [],
});

export const contributionsFilterStatusAtom = atom<Array<ContributionStatusEnum | "gated">>({
  key: "ContributionsFilterStatus",
  default: [],
});

export const contributionsFilterTechnologyAtom = atom<string[]>({
  key: "ContributionsFilterTechnology",
  default: [],
});

export const contributionsFilterTypeAtom = atom<ContributionTypeEnum[]>({
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

    const contributionsFilterContext = get(contributionsFilterContextAtom);
    const contributionsFilterDifficulty = get(contributionsFilterDifficultyAtom);
    const contributionsFilterDuration = get(contributionsFilterDurationAtom);
    const contributionsFilterProject = get(contributionsFilterProjectAtom);
    const contributionsFilterStatus = get(contributionsFilterStatusAtom);
    const contributionsFilterTechnology = get(contributionsFilterTechnologyAtom);
    const contributionsFilterType = get(contributionsFilterTypeAtom);

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
