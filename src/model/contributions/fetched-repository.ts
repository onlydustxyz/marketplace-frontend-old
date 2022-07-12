import config from "src/config";
import { Contribution, ContributionRepository, ContributionStatus, Project } from "./repository";

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
  public async list(): Promise<Contribution[]> {
    try {
      const response = await fetch(`${config.DATA_API_HOSTNAME}/projects`);

      const projectsWithContributions = (await response.json()) as ApiProject[];

      const contributionsWithProjects = projectsWithContributions.reduce((aggregatedContributions, project) => {
        const { contributions, ...projectFields } = project;

        return [
          ...aggregatedContributions,
          ...contributions.map(contribution => {
            const project: Project = {
              ...projectFields,
              githubLink: projectFields.github_link,
              description:
                projectFields.description || `## ${projectFields.title}\n\nFake project description with **markdown**`,
            };
            return {
              ...contribution,
              title: contribution.title || "Fake contribution title",
              description: contribution.description || "## Description\n\nFake description with **markdown**",
              githubLink: contribution.github_link,
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
