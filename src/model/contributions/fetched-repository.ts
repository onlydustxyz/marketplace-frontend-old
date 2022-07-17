import config from "src/config";
import { Contribution, ContributionRepository, ContributionStatus, ListParams, Project } from "./repository";

type ApiContribution = {
  id: string;
  title: string;
  description: string;
  github_link: string;
} & ContributionStatus;

type ApiProject = {
  id: string;
  title: string;
  description: string;
  github_link: string;
  contributions: ApiContribution[];
};

export class FetchedContributionRepository implements ContributionRepository {
  public async list({ contributorId }: ListParams = {}): Promise<Contribution[]> {
    try {
      const endpointUrl = new URL(`${config.DATA_API_HOSTNAME}/projects`);
      contributorId && endpointUrl.searchParams.set("contributor_id", contributorId.toString(10));

      const response = await fetch(endpointUrl.toString());

      const projectsWithContributions = (await response.json()) as ApiProject[];

      const contributionsWithProjects = projectsWithContributions.reduce((aggregatedContributions, project) => {
        const { contributions, ...projectFields } = project;

        return [
          ...aggregatedContributions,
          ...contributions.map(contribution => {
            const project: Project = { ...projectFields, openedContributionsAmount: 5 };
            return {
              ...contribution,
              project: project,
            } as Contribution;
          }),
        ];
      }, [] as Contribution[]);

      return contributionsWithProjects;
    } catch (error) {
      return [];
    }
  }

  public async add(contribution: Contribution): Promise<void> {
    console.warn("This feature is not yet implemented : contribution.add", contribution);
  }
}
