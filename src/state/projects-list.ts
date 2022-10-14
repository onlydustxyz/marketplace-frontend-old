import { selector } from "recoil";
import { ContributionMetadata } from "src/model/contributions/repository";
import { contributionsWithStatusState, ContributionWithStatus, ContributionStatusEnum } from "./contributions";
import {
  contributionsFilterContextAtom,
  contributionsFilterDifficultyAtom,
  contributionsFilterDurationAtom,
  contributionsFilterStatusAtom,
  contributionsFilterTechnologyAtom,
  contributionsFilterTypeAtom,
} from "./contributions-filters";
import { completedAssignementsAmountState } from "./source/assignements";
import { rawProjectsQuery } from "./source/projects";

export type Project = {
  id: string;
  title: string;
  description: string;
  logo?: string;
  github_link?: string;
  discord_link?: string;
  website_link?: string;
  members: string[];
};

export type ProjectWithAggregateContributions = Project & {
  openedContributionsAmount: number;
  statuses: Array<ContributionWithStatus["status"] | "gated">;
  technologies: ContributionWithStatus["metadata"]["technology"][];
  durations: ContributionWithStatus["metadata"]["duration"][];
  contexts: ContributionWithStatus["metadata"]["context"][];
  difficulties: ContributionWithStatus["metadata"]["difficulty"][];
  types: ContributionWithStatus["metadata"]["type"][];
};

export const projectsListState = selector({
  key: "ProjectsSelector",
  get: ({ get }) => {
    const rawProjects = get(rawProjectsQuery);
    const contributionsWithStatus = get(contributionsWithStatusState);

    const nbCompletedAssignements = get(completedAssignementsAmountState);

    return rawProjects.map(project => {
      const projectContributions = contributionsWithStatus.filter(
        contribution => contribution.project_id === project.id
      );

      const formattedProject: ProjectWithAggregateContributions = {
        ...project,
        openedContributionsAmount: projectContributions.filter(
          contribution => contribution.status === ContributionStatusEnum.OPEN
        ).length,

        technologies: formatProjectTechnologies(projectContributions),
        statuses: formatProjectStatuses(projectContributions, nbCompletedAssignements),
        durations: formatProjectMetadata("duration", projectContributions),
        contexts: formatProjectMetadata("context", projectContributions),
        difficulties: formatProjectMetadata("difficulty", projectContributions),
        types: formatProjectMetadata("type", projectContributions),
      };

      return formattedProject;
    });
  },
});

export const filteredProjectsSelector = selector({
  key: "FilteredProjects",

  get: ({ get }) => {
    const projects = get(projectsListState);

    const contributionsFilterContext = get(contributionsFilterContextAtom("projects"));
    const contributionsFilterDifficulty = get(contributionsFilterDifficultyAtom("projects"));
    const contributionsFilterDuration = get(contributionsFilterDurationAtom("projects"));
    const contributionsFilterStatus = get(contributionsFilterStatusAtom("projects"));
    const contributionsFilterTechnology = get(contributionsFilterTechnologyAtom("projects"));
    const contributionsFilterType = get(contributionsFilterTypeAtom("projects"));

    return projects
      .filter(filterProjectByStatuses(contributionsFilterStatus))
      .filter(filterProjectByProperty("contexts", contributionsFilterContext))
      .filter(filterProjectByProperty("difficulties", contributionsFilterDifficulty))
      .filter(filterProjectByProperty("durations", contributionsFilterDuration))
      .filter(filterProjectByProperty("technologies", contributionsFilterTechnology))
      .filter(filterProjectByProperty("types", contributionsFilterType));
  },
});

function formatProjectTechnologies(contributions: ContributionWithStatus[]) {
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

function formatProjectStatuses(contributions: ContributionWithStatus[], completedContributionsAmount: number | null) {
  const statuses = new Set<ContributionWithStatus["status"] | "gated">();

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

function formatProjectMetadata<T extends keyof ContributionMetadata>(
  metadataName: T,
  contributions: ContributionWithStatus[]
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

function filterProjectByStatuses(statuses: Array<ContributionStatusEnum | "gated">) {
  return (project: ProjectWithAggregateContributions) => {
    if (statuses.length === 0) {
      return true;
    }

    if (statuses.includes(ContributionStatusEnum.ASSIGNED)) {
      return project.statuses.some(status => {
        return [...statuses, ContributionStatusEnum.NO_SLOT].includes(status);
      });
    }

    return project.statuses.some(status => {
      return statuses.includes(status);
    });
  };
}

function filterProjectByProperty(
  propertyName: keyof ProjectWithAggregateContributions,
  filteredValues: Array<ProjectWithAggregateContributions[typeof propertyName]>
) {
  return (project: ProjectWithAggregateContributions) => {
    if (filteredValues.length === 0) {
      return true;
    }

    if (!project[propertyName]) {
      return false;
    }

    if (Array.isArray(project[propertyName])) {
      return (project[propertyName] as Array<ProjectWithAggregateContributions[typeof propertyName]>).some(
        propertyValue => {
          return filteredValues.includes(propertyValue);
        }
      );
    }

    return filteredValues.includes(project[propertyName]);
  };
}
