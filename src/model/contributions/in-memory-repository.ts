import { Contribution, ContributionRepository } from "./repository";

export class InMemoryContributionRepository implements ContributionRepository {
  private contributions: Contribution[] = [
    {
      id: "1",
      title: "Contribution 1",
      description: "Description 1",
      status: "open",
      project: {
        id: "1",
        title: "Project 1",
        description: "Description 1",
        githubLink: "https://github.com/onlydustxyz/deathnote-ui",
      },
    },
  ];

  public async list(): Promise<Contribution[]> {
    return this.contributions;
  }

  public async add(contribution: Contribution): Promise<void> {
    this.contributions.push(contribution);
  }
}
