import {
  Contribution,
  ContributionContextEnum,
  ContributionDifficultyEnum,
  ContributionDurationEnum,
  ContributionRepository,
  ContributionStatusEnum,
  ContributionTypeEnum,
} from "./repository";

export class InMemoryContributionRepository implements ContributionRepository {
  private contributions: Contribution[] = [
    {
      id: "1",
      title: "Contribution 1",
      description: "Description 1",
      status: ContributionStatusEnum.OPEN,
      github_link: "https://github.com/onlydustxyz/deathnote-ui",
      gate: 0,
      eligible: true,
      gateMissingCompletedContributions: 0,
      metadata: {
        context: ContributionContextEnum.ISOLATED,
        difficulty: ContributionDifficultyEnum.EASY,
        duration: ContributionDurationEnum.UNDER_A_DAY,
        technology: "cairo",
        type: ContributionTypeEnum.FEATURE,
      },
      project: {
        id: "1",
        title: "Project 1",
        description: "Description 1",
        github_link: "https://github.com/onlydustxyz/deathnote-ui",
        openedContributionsAmount: 1,
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
