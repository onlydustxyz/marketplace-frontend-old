import { InMemoryContributionRepository } from "./in-memory-repository";
import { FetchedContributionRepository } from "./fetched-repository";

import { ContributorAccountAddress } from "../contributors/repository";
import { ContributionApplicationDto } from "../applications/repository";
import { AssignementStatusDtoEnum } from "../assingments";

export type ContributionAssignementDto = {
  contribution_id: ContributionDto["id"];
  contributor_account_address: ContributorAccountAddress;
  status: AssignementStatusDtoEnum;
};

export type ContributionDto = {
  id: string;
  project_id: string;
  title: string;
  description: string;
  github_link: string;
  gate: number;
  closed: boolean;
  max_slot_count: number | null;
  available_slot_count: number;
  assignements: ContributionAssignementDto[];
  pending_applications: ContributionApplicationDto[];
  metadata: ContributionMetadata;
};

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

export type ContributionMetadata = {
  context?: ContributionContextEnum;
  difficulty?: ContributionDifficultyEnum;
  duration?: ContributionDurationEnum;
  technology?: string;
  type?: ContributionTypeEnum;
};

export type ListParams = {
  contributorAccountAddress?: ContributorAccountAddress | undefined;
};

export interface ContributionRepository {
  list(params?: ListParams): Promise<ContributionDto[]>;
}

export const contributionRepository: ContributionRepository =
  process.env.NODE_ENV === "test" ? new InMemoryContributionRepository() : new FetchedContributionRepository();
