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
            technology: undefined,
            type: ContributionTypeEnum.FEATURE,
          },
        },
        {
          id: "6",
          title: "Contribution 6",
          description: "Description 6",
          status: ContributionStatusEnum.ASSIGNED,
          github_link: "https://example.com/contributions/6",
          gate: 0,
          metadata: {
            assignee: "0x00026",
            context: ContributionContextEnum.ISOLATED,
            difficulty: ContributionDifficultyEnum.EASY,
            duration: ContributionDurationEnum.UNDER_A_DAY,
            technology: undefined,
            type: ContributionTypeEnum.FEATURE,
          },
        },
      ],
      members: ["0x0abcdefabcdef"],
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
          status: ContributionStatusEnum.COMPLETED,
          github_link: "https://example.com/contributions/2",
          gate: 0,
          metadata: {
            assignee: "0x123456789",
            github_username: "github-username",
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
            technology: "rust",
            type: ContributionTypeEnum.DOCUMENTATION,
          },
        },
        {
          id: "4",
          title: "Contribution 4",
          description: "Description 4",
          status: ContributionStatusEnum.OPEN,
          github_link: "https://example.com/contributions/4",
          gate: 0,
          metadata: {
            context: ContributionContextEnum.COUPLED,
            difficulty: ContributionDifficultyEnum.EASY,
            duration: ContributionDurationEnum.UNDER_A_DAY,
            technology: "rust",
            type: ContributionTypeEnum.DOCUMENTATION,
          },
        },
        {
          id: "5",
          title: "Contribution 5",
          description: "Description 5",
          status: ContributionStatusEnum.OPEN,
          github_link: "https://example.com/contributions/5",
          gate: 1000000000,
          metadata: {
            context: ContributionContextEnum.INTRICATED,
            difficulty: ContributionDifficultyEnum.HARD,
            duration: ContributionDurationEnum.WEEKS,
            technology: "rust",
            type: ContributionTypeEnum.REFACTOR,
          },
        },
      ],
      members: [
        "0x0123456789",
        {
          contributor_account: "0x123456789abcdef",
          is_lead_contributor: false,
        },
      ],
    },
  ];

  public async list(): Promise<ProjectDto[]> {
    return this.projects;
  }
}
