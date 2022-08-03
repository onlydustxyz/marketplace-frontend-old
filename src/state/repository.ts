import { selector, selectorFamily, useRecoilRefresher_UNSTABLE } from "recoil";
import { applicationRepository } from "src/model/applications/repository";
import {
  AssignedStatus,
  CompletedStatus,
  ContributionDto,
  ContributionMetadata,
  ContributionStatusAndMetadata,
  ContributionStatusEnum,
  OpenStatus,
  ProjectDto,
  projectRepository,
} from "src/model/projects/repository";
import {
  contributionsFilterContextAtom,
  contributionsFilterDifficultyAtom,
  contributionsFilterDurationAtom,
  contributionsFilterStatusAtom,
  contributionsFilterTechnologyAtom,
  contributionsFilterTypeAtom,
} from "./contributions-filters";
import { userContributorIdSelector } from "./profileRegistryContract";

type ProjectBase = {
  id: string;
  title: string;
  description: string;
  logo?: string;
  github_link?: string;
  discord_link?: string;
  website_link?: string;
};

export type Project = ProjectBase & {
  openedContributionsAmount: number;
  statuses: Array<Contribution["status"] | "gated">;
  technologies: Contribution["metadata"]["technology"][];
  durations: Contribution["metadata"]["duration"][];
  contexts: Contribution["metadata"]["context"][];
  difficulties: Contribution["metadata"]["difficulty"][];
  types: Contribution["metadata"]["type"][];
};

export type Contribution = {
  id: string;
  title: string;
  description: string;
  project: ProjectBase;
  github_link: string;
  eligible: boolean | null;
  gate: number;
  gateMissingCompletedContributions: number;
} & ContributionStatusAndMetadata;

export type OpenContribution = Contribution & OpenStatus;
export type AssignedContribution = Contribution & AssignedStatus;
export type CompletedContribution = Contribution & CompletedStatus;

type RawProjectWithContributions = {
  project: Omit<ProjectDto, "contributions">;
  contributions: ContributionDto[];
};

const rawProjectsWithContributionsQuery = selector<RawProjectWithContributions[]>({
  key: "RawProjects",
  get: async () => {
    const projects = await projectRepository.list();

    return projects.map(project => {
      const { contributions, ...projectFields } = project;

      return {
        project: projectFields,
        contributions,
      };
    });
  },
});

export const projectsQuery = selector({
  key: "Projects",
  get: ({ get }) => {
    const userContributorId = get(userContributorIdSelector);
    const rawProjectsWithContributions = get(rawProjectsWithContributionsQuery);

    const completedContributionsAmount = countCompletedContributions(rawProjectsWithContributions, userContributorId);

    return rawProjectsWithContributions.map(({ project, contributions }) => {
      const formattedProject: Project = {
        ...project,
        openedContributionsAmount: contributions.filter(
          contribution => contribution.status === ContributionStatusEnum.OPEN
        ).length,
        technologies: formatProjectTechnologies(contributions),
        statuses: formatProjectStatuses(contributions, completedContributionsAmount),
        durations: formatProjectMetadata("duration", contributions),
        contexts: formatProjectMetadata("context", contributions),
        difficulties: formatProjectMetadata("difficulty", contributions),
        types: formatProjectMetadata("type", contributions),
      };

      return formattedProject;
    });
  },
});

export const contributionsQuery = selector({
  key: "Contributions",
  get: async ({ get }) => {
    const rawProjectsWithContributions = get(rawProjectsWithContributionsQuery);
    const userContributorId = get(userContributorIdSelector);

    const completedContributionsAmount = countCompletedContributions(rawProjectsWithContributions, userContributorId);

    const contributionsWithProjects = rawProjectsWithContributions.reduce<Contribution[]>(
      (aggregatedContributions, { contributions, project }) => {
        return [
          ...aggregatedContributions,
          ...contributions.map(contributionDto => {
            const contribution: Contribution = {
              ...contributionDto,
              project,
              eligible:
                completedContributionsAmount === null ? null : completedContributionsAmount >= contributionDto.gate,
              gateMissingCompletedContributions: contributionDto.gate - (completedContributionsAmount || 0),
            };

            return contribution;
          }),
        ];
      },
      []
    );

    return contributionsWithProjects;
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
      const projects = get(projectsQuery);
      return projects.find(project => project.id === id);
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
        parseInt(contribution.metadata.assignee, 16) === userContributorId
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
        parseInt(contribution.metadata.assignee, 16) === userContributorId
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
        parseInt(contribution.metadata.assignee, 16) === userContributorId
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
        parseInt(contribution.metadata.assignee, 16) === userContributorId
    ) as CompletedContribution[];
  },
});

export const technologiesQuery = selector({
  key: "Technologies",
  get: ({ get }) => {
    const contributions = get(contributionsQuery);

    const technologies = new Set<string>();

    contributions.forEach(contribution => {
      if (contribution.metadata.technology && !technologies.has(contribution.metadata.technology)) {
        technologies.add(contribution.metadata.technology);
      }
    });

    return Array.from(technologies);
  },
});

export const filteredProjectsSelector = selector({
  key: "FilteredProjects",

  get: ({ get }) => {
    const projects = get(projectsQuery);

    const contributionsFilterContext = get(contributionsFilterContextAtom("projects"));
    const contributionsFilterDifficulty = get(contributionsFilterDifficultyAtom("projects"));
    const contributionsFilterDuration = get(contributionsFilterDurationAtom("projects"));
    const contributionsFilterStatus = get(contributionsFilterStatusAtom("projects"));
    const contributionsFilterTechnology = get(contributionsFilterTechnologyAtom("projects"));
    const contributionsFilterType = get(contributionsFilterTypeAtom("projects"));

    console.log({ contributionsFilterTechnology });
    return projects
      .filter(filterProjectByStatuses(contributionsFilterStatus))
      .filter(filterProjectByProperty("contexts", contributionsFilterContext))
      .filter(filterProjectByProperty("difficulties", contributionsFilterDifficulty))
      .filter(filterProjectByProperty("durations", contributionsFilterDuration))
      .filter(filterProjectByProperty("technologies", contributionsFilterTechnology))
      .filter(filterProjectByProperty("types", contributionsFilterType));
  },
});

function filterProjectByStatuses(statuses: Array<ContributionStatusEnum | "gated">) {
  return (project: Project) => {
    if (statuses.length === 0) {
      return true;
    }

    return project.statuses.some(status => {
      return statuses.includes(status);
    });
  };
}

function filterProjectByProperty(propertyName: keyof Project, filteredValues: Array<Project[typeof propertyName]>) {
  return (project: Project) => {
    if (filteredValues.length === 0) {
      return true;
    }

    if (!project[propertyName]) {
      return false;
    }

    if (Array.isArray(project[propertyName])) {
      return (project[propertyName] as Array<Project[typeof propertyName]>).some(propertyValue => {
        return filteredValues.includes(propertyValue);
      });
    }

    return filteredValues.includes(project[propertyName]);
  };
}

export const hasContributorAppliedToContributionSelector = selectorFamily({
  key: "HasContributorAppliedToContribution",
  get:
    (contributionId?: Contribution["id"] | undefined) =>
    async ({ get }) => {
      const contributorId = get(userContributorIdSelector);

      if (!contributorId || !contributionId) {
        return false;
      }

      return await applicationRepository.hasContributorAppliedToContribution({ contributionId, contributorId });
    },
});

function countCompletedContributions(
  rawProjectsWithContributions: RawProjectWithContributions[],
  contributorId: number | undefined
) {
  if (!contributorId) {
    return null;
  }

  return rawProjectsWithContributions.reduce((amount, { contributions }) => {
    return (
      amount +
      contributions.reduce((subAmount, contribution) => {
        if (
          contribution.status === ContributionStatusEnum.COMPLETED &&
          parseInt(contribution.metadata.assignee, 16) === contributorId
        ) {
          return subAmount + 1;
        }
        return subAmount;
      }, 0)
    );
  }, 0);
}

function formatProjectMetadata<T extends keyof ContributionMetadata>(
  metadataName: T,
  contributions: ContributionDto[]
) {
  const metadataSet = new Set<ContributionMetadata[T]>();

  contributions.forEach(contribution => {
    const metadataValue = contribution.metadata[metadataName];

    if (!metadataValue) {
      return;
    }

    metadataSet.add(metadataValue);
  });

  return Array.from(metadataSet);
}

function formatProjectTechnologies(contributions: ContributionDto[]) {
  const technologyCount = new Map<string, number>();

  contributions.forEach(contribution => {
    if (!contribution.metadata.technology) {
      return;
    }

    const currentCount = technologyCount.get(contribution.metadata.technology) || 0;

    technologyCount.set(contribution.metadata.technology, currentCount + 1);
  });

  const technologyCountList = Array.from(technologyCount);

  return technologyCountList
    .sort(([, count1], [, count2]) => {
      if (count1 === count2) {
        return 0;
      }

      return count1 < count2 ? 1 : -1;
    })
    .map(([technology]) => technology);
}

function formatProjectStatuses(contributions: ContributionDto[], completedContributionsAmount: number | null) {
  const statuses = new Set<Contribution["status"] | "gated">();

  contributions.forEach(contribution => {
    const finalStatus =
      contribution.status === ContributionStatusEnum.OPEN &&
      completedContributionsAmount !== null &&
      completedContributionsAmount < contribution.gate
        ? "gated"
        : contribution.status;

    statuses.add(finalStatus);
  });

  return Array.from(statuses);
}
