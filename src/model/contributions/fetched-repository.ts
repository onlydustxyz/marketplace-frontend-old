import config from "src/config";
import {
  Contribution,
  ContributionRepository,
  ContributionStatusAndMetadata,
  ContributionStatusEnum,
  ListParams,
  Project,
} from "./repository";

type ContributionDto = {
  id: string;
  title: string;
  description: string;
  github_link: string;
  gate: number;
} & ContributionStatusAndMetadata;

type ProjectDto = {
  id: string;
  title: string;
  description: string;
  github_link: string;
  logo: string;
  contributions: ContributionDto[];
};

export class FetchedContributionRepository implements ContributionRepository {
  public async list({ contributorId }: ListParams = {}): Promise<Contribution[]> {
    try {
      const endpointUrl = new URL(`${config.DATA_API_HOSTNAME}/projects`);
      contributorId && endpointUrl.searchParams.set("contributor_id", contributorId.toString(10));

      const response = await fetch(endpointUrl.toString());

      const projectsWithContributions: ProjectDto[] = await response.json();

      const completedContributionsAmount = countCompletedContributions(projectsWithContributions, contributorId);

      const contributionsWithProjects = projectsWithContributions.reduce<Contribution[]>(
        (aggregatedContributions, project) => {
          const { contributions, ...projectFields } = project;

          return [
            ...aggregatedContributions,
            ...contributions.map(contributionDto => {
              const project: Project = { ...projectFields, openedContributionsAmount: 5 };
              const contribution: Contribution = {
                ...contributionDto,
                project: project,
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
    } catch (error) {
      return [];
    }
  }

  public async add(contribution: Contribution): Promise<void> {
    console.warn("This feature is not yet implemented : contribution.add", contribution);
  }
}

function countCompletedContributions(projectsWithContributions: ProjectDto[], contributorId: number | undefined) {
  if (!contributorId) {
    return null;
  }

  return projectsWithContributions.reduce((amount, project) => {
    return (
      amount +
      project.contributions.reduce((subAmount, contribution) => {
        if (
          contribution.status === ContributionStatusEnum.COMPLETED &&
          contribution.metadata.assignee === `0x${contributorId?.toString(16)}`
        ) {
          return subAmount + 1;
        }
        return subAmount;
      }, 0)
    );
  }, 0);
}
