import {
  ContributionContextEnum,
  ContributionDifficultyEnum,
  ContributionDurationEnum,
  ProjectRepository,
  ContributionStatusEnum,
  ContributionTypeEnum,
  ProjectDto,
} from "./repository";

export class InMemoryProjectRepository implements ProjectRepository {
  private projects: ProjectDto[] = [
    {
      id: "1",
      title: "Project 1",
      description: "Description 1",
      github_link: "https://example.com/projects/1",
      contributions: [
        {
          id: "1",
          title: "Contribution 1",
          description: "Description 1",
          status: ContributionStatusEnum.OPEN,
          github_link: "https://example.com/contributions/1",
          gate: 0,
          metadata: {
            context: ContributionContextEnum.ISOLATED,
            difficulty: ContributionDifficultyEnum.EASY,
            duration: ContributionDurationEnum.UNDER_A_DAY,
            technology: "cairo",
            type: ContributionTypeEnum.FEATURE,
          },
        },
      ],
    },
    {
      id: "2",
      title: "Project 2",
      description: "Description 2",
      github_link: "https://example.com/projects/2",
      contributions: [],
    },
    {
      id: "3",
      title: "Project 3",
      description: "Description 3",
      github_link: "https://example.com/projects/3",
      contributions: [
        {
          id: "2",
          title: "Contribution 2",
          description: "Description 2",
          status: ContributionStatusEnum.OPEN,
          github_link: "https://example.com/contributions/2",
          gate: 0,
          metadata: {
            context: ContributionContextEnum.COUPLED,
            difficulty: ContributionDifficultyEnum.INTERMEDIATE,
            duration: ContributionDurationEnum.FEW_DAYS,
            technology: "javascript",
            type: ContributionTypeEnum.FEATURE,
          },
        },
        {
          id: "3",
          title: "Contribution 3",
          description: "Description 3",
          status: ContributionStatusEnum.OPEN,
          github_link: "https://example.com/contributions/3",
          gate: 0,
          metadata: {
            context: ContributionContextEnum.COUPLED,
            difficulty: ContributionDifficultyEnum.EASY,
            duration: ContributionDurationEnum.UNDER_A_DAY,
            technology: undefined,
            type: ContributionTypeEnum.DOCUMENTATION,
          },
        },
      ],
    },
  ];

  public async list(): Promise<ProjectDto[]> {
    return this.projects;
  }
}
