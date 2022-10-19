import { ProjectRepository, ProjectDto } from "./repository";

export class InMemoryProjectRepository implements ProjectRepository {
  private projects: ProjectDto[] = [
    {
      id: "1",
      title: "Project 1",
      description: "Description 1",
      github_link: "https://example.com/projects/1",
      discord_link: "https://example.com/discord/1",
      website_link: "https://example.com/website/1",
      members: ["0x0abcdefabcdef"],
      logo: "https://app.onlydust.xyz/assets/onlydust-logo.5f8cc594.png",
    },
    {
      id: "2",
      title: "Project 2",
      description: "Description 2",
      github_link: "https://example.com/projects/2",
      members: [],
    },
    {
      id: "3",
      title: "Project 3",
      description: "Description 3",
      github_link: "https://example.com/projects/3",
      members: [
        "0x123456789",
        "0x012c0407D341F351E000b894c3a0d226Bc971caEd123eF1abb9388f6AA02AED0",
        "0x123456789abcdef",
      ],
    },
    {
      id: "4",
      title: "Project 4",
      description: "Description 4",
      github_link: "https://example.com/projects/4",
      contributions: [
        {
          id: "12",
          title: "Contribution 12",
          description: "Description 12",
          status: ContributionStatusEnum.ASSIGNED,
          github_link: "https://example.com/contributions/12",
          gate: 0,
          metadata: {
            assignee: "0x8888",
            github_username: "github-user-0x8888",
            context: ContributionContextEnum.COUPLED,
            difficulty: ContributionDifficultyEnum.INTERMEDIATE,
            duration: ContributionDurationEnum.FEW_DAYS,
            technology: "javascript",
            type: ContributionTypeEnum.FEATURE,
          },
        },
        {
          id: "13",
          title: "Contribution 13",
          description: "Description 13",
          status: ContributionStatusEnum.ASSIGNED,
          github_link: "https://example.com/contributions/13",
          gate: 0,
          metadata: {
            assignee: "0x123456789",
            github_username: "github-user-0x26",
            context: ContributionContextEnum.COUPLED,
            difficulty: ContributionDifficultyEnum.EASY,
            duration: ContributionDurationEnum.UNDER_A_DAY,
            technology: "rust",
            type: ContributionTypeEnum.DOCUMENTATION,
          },
        },
      ],
      members: ["0x123456789"],
    },
    {
      id: "5",
      title: "Project 5",
      description: "Description 5",
      github_link: "https://example.com/projects/5",
      contributions: [
        {
          id: "14",
          title: "Contribution 14",
          description: "Description 14",
          status: ContributionStatusEnum.COMPLETED,
          github_link: "https://example.com/contributions/14",
          gate: 0,
          metadata: {
            assignee: "0x123456789",
            github_username: "github-user-0x26",
            context: ContributionContextEnum.COUPLED,
            difficulty: ContributionDifficultyEnum.INTERMEDIATE,
            duration: ContributionDurationEnum.FEW_DAYS,
            technology: "javascript",
            type: ContributionTypeEnum.FEATURE,
          },
        },
        {
          id: "15",
          title: "Contribution 15",
          description: "Description 15",
          status: ContributionStatusEnum.COMPLETED,
          github_link: "https://example.com/contributions/15",
          gate: 0,
          metadata: {
            assignee: "0x153456789",
            github_username: "github-user-0x26",
            context: ContributionContextEnum.COUPLED,
            difficulty: ContributionDifficultyEnum.EASY,
            duration: ContributionDurationEnum.UNDER_A_DAY,
            technology: "rust",
            type: ContributionTypeEnum.DOCUMENTATION,
          },
        },
      ],
      members: ["0x153456789"],
    },
  ];

  public async list(): Promise<ProjectDto[]> {
    return this.projects;
  }
}
