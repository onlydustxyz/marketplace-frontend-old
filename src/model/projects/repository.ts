import { InMemoryProjectRepository } from "./in-memory-repository";
import { FetchedProjectRepository } from "./fetched-repository";
import config from "src/config";

export type ContributionDto = {
  id: string;
  title: string;
  description: string;
  github_link: string;
  gate: number;
} & ContributionStatusAndMetadata;

export type ProjectDto = {
  id: string;
  title: string;
  description: string;
  github_link: string;
  discord_link?: string;
  website_link?: string;
  logo?: string;
  contributions: ContributionDto[];
  members: string[];
};

export type ProjectMember = {
  contributor_account: string;
  is_lead_contributor: boolean;
};

export enum ContributionStatusEnum {
  OPEN = "OPEN",
  ASSIGNED = "ASSIGNED",
  COMPLETED = "COMPLETED",
  ABANDONED = "ABANDONED",
}

export enum ContributionContextEnum {
  ISOLATED = "isolated",
  COUPLED = "coupled",
  INTRICATED = "intricated",
}

export enum ContributionDifficultyEnum {
  EASY = "easy",
  INTERMEDIATE = "intermediate",
  HARD = "hard",
}

export enum ContributionDurationEnum {
  UNDER_A_DAY = "under a day",
  FEW_DAYS = "few days",
  WEEKS = "weeks",
}

export enum ContributionTypeEnum {
  BUG = "bug",
  BUILD = "build",
  DOCUMENTATION = "documentation",
  FEATURE = "feature",
  PRFOMANCE = "performance",
  REFACTOR = "refactor",
  TEST = "test",
}

export type ContributionStatusAndMetadata = OpenStatus | AssignedStatus | CompletedStatus;

export type ContributionMetadata = {
  context?: ContributionContextEnum;
  difficulty?: ContributionDifficultyEnum;
  duration?: ContributionDurationEnum;
  technology?: string;
  type?: ContributionTypeEnum;
};

export type ContributionMetadataAssignee = {
  assignee: string;
  github_username?: string;
};

export type OpenStatus = {
  status: ContributionStatusEnum.OPEN;
  metadata: ContributionMetadata;
};

export type AssignedStatus = {
  status: ContributionStatusEnum.ASSIGNED;
  metadata: ContributionMetadata & ContributionMetadataAssignee;
};

export type CompletedStatus = {
  status: ContributionStatusEnum.COMPLETED;
  metadata: ContributionMetadata & ContributionMetadataAssignee;
};

export interface ProjectRepository {
  list(): Promise<ProjectDto[]>;
}

export const projectRepository: ProjectRepository =
  config.MODE === "test" ? new InMemoryProjectRepository() : new FetchedProjectRepository();
