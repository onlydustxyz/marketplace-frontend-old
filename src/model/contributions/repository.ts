import { InMemoryContributionRepository } from "./in-memory-repository";
import { FetchedContributionRepository } from "./fetched-repository";
import { ContributorAccountAddress } from "../contributors/repository";
import config from "src/config";

export type ContributionDto = {
  id: string;
  project_id: string;
  title: string;
  description: string;
  github_link: string;
  gate: number;
  closed: boolean;
} & ContributionStatusAndMetadata;

export enum ContributionStatusEnumDto {
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

export type ContributionStatusAndMetadata = OpenStatus | AssignedStatus | CompletedStatus | AbandonedStatus;

export type ContributionMetadata = {
  context?: ContributionContextEnum;
  difficulty?: ContributionDifficultyEnum;
  duration?: ContributionDurationEnum;
  technology?: string;
  type?: ContributionTypeEnum;
};

export type ContributionMetadataAssignee = {
  assignee: ContributorAccountAddress;
  github_username?: string;
};

export type OpenStatus = {
  status: ContributionStatusEnumDto.OPEN;
  metadata: ContributionMetadata;
};

export type AssignedStatus = {
  status: ContributionStatusEnumDto.ASSIGNED;
  metadata: ContributionMetadata & ContributionMetadataAssignee;
};

export type CompletedStatus = {
  status: ContributionStatusEnumDto.COMPLETED;
  metadata: ContributionMetadata & ContributionMetadataAssignee;
};

export type AbandonedStatus = {
  status: ContributionStatusEnumDto.ABANDONED;
  closed: true;
  metadata: ContributionMetadata & Partial<ContributionMetadataAssignee>;
};

export interface ContributionRepository {
  list(): Promise<ContributionDto[]>;
}

export const contributionRepository: ContributionRepository =
  config.MODE === "test" ? new InMemoryContributionRepository() : new FetchedContributionRepository();
