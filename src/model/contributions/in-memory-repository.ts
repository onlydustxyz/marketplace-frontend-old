import { ContributorAccountAddress } from "../contributors/repository";
import {
  ContributionContextEnum,
  ContributionDifficultyEnum,
  ContributionDurationEnum,
  ContributionRepository,
  ContributionStatusEnumDto,
  ContributionTypeEnum,
  ContributionDto,
} from "./repository";

export class InMemoryContributionRepository implements ContributionRepository {
  private projects: ContributionDto[] = [
    {
      id: "1",
      project_id: "1",
      title: "Contribution 1",
      description: "Description 1",
      status: ContributionStatusEnumDto.OPEN,
      github_link: "https://example.com/contributions/1",
      gate: 0,
      closed: false,
      metadata: {
        context: ContributionContextEnum.ISOLATED,
        difficulty: ContributionDifficultyEnum.EASY,
        duration: ContributionDurationEnum.UNDER_A_DAY,
        technology: undefined,
        type: ContributionTypeEnum.FEATURE,
      },
    },
    {
      id: "2",
      project_id: "3",
      title: "Contribution 2",
      description: "Description 2",
      status: ContributionStatusEnumDto.COMPLETED,
      github_link: "https://example.com/contributions/2",
      gate: 0,
      closed: false,
      metadata: {
        assignee: "0x8888" as ContributorAccountAddress,
        github_username: "github-user-0x8888",
        context: ContributionContextEnum.COUPLED,
        difficulty: ContributionDifficultyEnum.INTERMEDIATE,
        duration: ContributionDurationEnum.FEW_DAYS,
        technology: "javascript",
        type: ContributionTypeEnum.FEATURE,
      },
    },
    {
      id: "3",
      project_id: "3",
      title: "Contribution 3",
      description: "Description 3",
      status: ContributionStatusEnumDto.OPEN,
      github_link: "https://example.com/contributions/3",
      gate: 0,
      closed: false,
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
      project_id: "3",
      title: "Contribution 4",
      description: "Description 4",
      status: ContributionStatusEnumDto.OPEN,
      github_link: "https://example.com/contributions/4",
      gate: 0,
      closed: false,
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
      project_id: "3",
      title: "Contribution 5",
      description: "Description 5",
      status: ContributionStatusEnumDto.OPEN,
      github_link: "https://example.com/contributions/5",
      gate: 1000000000,
      closed: false,
      metadata: {
        context: ContributionContextEnum.INTRICATED,
        difficulty: ContributionDifficultyEnum.HARD,
        duration: ContributionDurationEnum.WEEKS,
        technology: "rust",
        type: ContributionTypeEnum.REFACTOR,
      },
    },
    {
      id: "6",
      project_id: "1",
      title: "Contribution 6",
      description: "Description 6",
      status: ContributionStatusEnumDto.ASSIGNED,
      github_link: "https://example.com/contributions/6",
      gate: 0,
      closed: false,
      metadata: {
        assignee: "0x123456789" as ContributorAccountAddress,
        github_username: "github-user-0x26",
        context: ContributionContextEnum.ISOLATED,
        difficulty: ContributionDifficultyEnum.EASY,
        duration: ContributionDurationEnum.UNDER_A_DAY,
        technology: undefined,
        type: ContributionTypeEnum.FEATURE,
      },
    },
    {
      id: "7",
      project_id: "1",
      title: "Contribution 7",
      description: "Description 7",
      status: ContributionStatusEnumDto.OPEN,
      github_link: "https://example.com/contributions/7",
      gate: 10,
      closed: false,
      metadata: {
        context: ContributionContextEnum.ISOLATED,
        difficulty: ContributionDifficultyEnum.EASY,
        duration: ContributionDurationEnum.UNDER_A_DAY,
        technology: "python",
        type: ContributionTypeEnum.FEATURE,
      },
    },
    {
      id: "8",
      project_id: "3",
      title: "Contribution 8",
      description: "Description 8",
      status: ContributionStatusEnumDto.ASSIGNED,
      github_link: "https://example.com/contributions/8",
      gate: 0,
      closed: false,
      metadata: {
        assignee: "0x999" as ContributorAccountAddress,
        github_username: "github-user-0x1",
        context: ContributionContextEnum.ISOLATED,
        difficulty: ContributionDifficultyEnum.EASY,
        duration: ContributionDurationEnum.UNDER_A_DAY,
        technology: undefined,
        type: ContributionTypeEnum.FEATURE,
      },
    },
    {
      id: "9",
      project_id: "3",
      title: "Contribution 9",
      description: "Description ",
      status: ContributionStatusEnumDto.ABANDONED,
      github_link: "https://example.com/contributions/9",
      gate: 0,
      closed: true,
      metadata: {
        context: ContributionContextEnum.ISOLATED,
        difficulty: ContributionDifficultyEnum.EASY,
        duration: ContributionDurationEnum.UNDER_A_DAY,
        technology: undefined,
        type: ContributionTypeEnum.FEATURE,
      },
    },
    {
      id: "10",
      project_id: "3",
      title: "Contribution 10",
      description: "Description ",
      status: ContributionStatusEnumDto.COMPLETED,
      github_link: "https://example.com/contributions/10",
      gate: 0,
      closed: true,
      metadata: {
        assignee: "0x123456789" as ContributorAccountAddress,
        github_username: "github-user-0x1",
        context: ContributionContextEnum.ISOLATED,
        difficulty: ContributionDifficultyEnum.EASY,
        duration: ContributionDurationEnum.UNDER_A_DAY,
        technology: undefined,
        type: ContributionTypeEnum.FEATURE,
      },
    },
    {
      id: "11",
      project_id: "3",
      title: "Contribution 11",
      description: "Description ",
      status: ContributionStatusEnumDto.COMPLETED,
      github_link: "https://example.com/contributions/11",
      gate: 0,
      closed: false,
      metadata: {
        assignee: "0x888" as ContributorAccountAddress,
        github_username: "github-user-0x1",
        context: ContributionContextEnum.ISOLATED,
        difficulty: ContributionDifficultyEnum.EASY,
        duration: ContributionDurationEnum.UNDER_A_DAY,
        technology: undefined,
        type: ContributionTypeEnum.FEATURE,
      },
    },
  ];

  public async list(): Promise<ContributionDto[]> {
    return this.projects;
  }
}
