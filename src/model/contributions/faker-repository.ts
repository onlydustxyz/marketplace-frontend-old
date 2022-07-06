import { faker } from "@faker-js/faker";

import { Contribution, ContributionRepository, ContributionStatus } from "./repository";

export class FakerContributionRepository implements ContributionRepository {
  private contributions: Contribution[] = Array(20)
    .fill(0)
    .map((_, index) => {
      const contributionStatus: ContributionStatus = faker.helpers.arrayElement([
        {
          status: "open",
        },
        {
          status: "assigned",
          metadata: {
            assignee: faker.datatype.hexadecimal(62),
          },
        },
        {
          status: "completed",
          metadata: {
            assignee: faker.datatype.hexadecimal(62),
          },
        },
      ]);
      return {
        id: `${index + 1}`,
        title: faker.git.commitMessage(),
        description: faker.hacker.phrase(),
        ...contributionStatus,
        project: {
          id: `${index + 1}`,
          title: faker.commerce.productName(),
          description: faker.commerce.productDescription(),
          githubLink: faker.internet.url(),
        },
      };
    });

  public async list(): Promise<Contribution[]> {
    return this.contributions;
  }

  public async add(contribution: Contribution): Promise<void> {
    this.contributions.push(contribution);
  }
}
