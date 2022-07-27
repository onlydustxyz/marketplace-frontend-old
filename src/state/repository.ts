import { selector, selectorFamily } from "recoil";
import {
  AssignedStatus,
  CompletedStatus,
  ContributionDto,
  ContributionStatusAndMetadata,
  ContributionStatusEnum,
  OpenStatus,
  ProjectDto,
  repository,
} from "src/model/projects/repository";
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
  technologies: string[];
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
    const projects = await repository.list();

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
    const rawProjectsWithContributions = get(rawProjectsWithContributionsQuery);

    return rawProjectsWithContributions.map(({ project, contributions }) => {
      const formattedProject: Project = {
        ...project,
        openedContributionsAmount: contributions.filter(
          contribution => contribution.status === ContributionStatusEnum.OPEN
        ).length,
        technologies: formatProjectTechnologies(contributions),
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
