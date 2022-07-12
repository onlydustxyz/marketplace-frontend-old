import config from "src/config";
import { Contribution, ContributionRepository, Project } from "./repository";

type ApiContribution = Omit<Contribution, "project">;

type ApiProject = Project & {
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
          ...contributions.map(
            contribution =>
              ({
                ...contribution,
                title: contribution.title || "Fake contribution title",
                description: contribution.description || "## Description\n\nFake description with **markdown**",
                project: {
                  ...projectFields,
                  description:
                    projectFields.description ||
                    `## ${projectFields.title}\n\nFake project description with **markdown**`,
                },
              } as Contribution)
          ),
        ];
      }, [] as Contribution[]);

      return contributionsWithProjects;
    } catch (error) {
      return [];
    }

    return [];
  }

  public async add(contribution: Contribution): Promise<void> {
    console.warn("This feature is not yet implemented : contribution.add");
  }
}
