import { InMemoryContributionRepository } from "./in-memory-repository";
import { FetchedContributionRepository } from "./fetched-repository";

export type Project = {
  id: string;
  title: string;
  description: string;
  logo?: string;
  githubLink?: string;
  discordLink?: string;
  websiteLink?: string;
};

export type ContributionBase = {
  id: string;
  title: string;
  description: string;
  project: Project;
  githubLink: string;
};

export enum ContributionStatusEnum {
  OPEN = "OPEN",
  ASSIGNED = "ASSIGNED",
  COMPLETED = "COMPLETED",
  ABANDONED = "ABANDONED",
}

export type Contribution = ContributionBase & ContributionStatus;

export type ContributionStatus = OpenStatus | AssignedStatus | CompletedStatus;
export type OpenContribution = Contribution & OpenStatus;
export type AssignedContribution = Contribution & AssignedStatus;
export type CompletedContribution = Contribution & CompletedStatus;

export type ContributionMetadata = {
  context?: string;
  difficulty?: string;
  duration?: string;
  technology?: string;
  type?: string;
};

export type ContributionMetadataAssignee = {
  assignee: string;
  github_username: string;
};

type OpenStatus = {
  status: ContributionStatusEnum.OPEN;
  metadata: ContributionMetadata;
};

type AssignedStatus = {
  status: ContributionStatusEnum.ASSIGNED;
  metadata: ContributionMetadata & ContributionMetadataAssignee;
};

type CompletedStatus = {
  status: ContributionStatusEnum.COMPLETED;
  metadata: ContributionMetadata & ContributionMetadataAssignee;
};

export interface ContributionRepository {
  list(): Promise<Contribution[]>;
}

export const repository: ContributionRepository =
  process.env.NODE_ENV === "test" ? new InMemoryContributionRepository() : new FetchedContributionRepository();
