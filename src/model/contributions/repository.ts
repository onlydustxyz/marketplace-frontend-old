import { InMemoryContributionRepository } from "./in-memory-repository";
import { FetchedContributionRepository } from "./fetched-repository";

export type Project = {
  id: string;
  title: string;
  description: string;
  githubLink: string;
};

export type ContributionBase = {
  id: string;
  title: string;
  description: string;
  project: Project;
};

export enum ContributionStatusEnum {
  OPEN = "OPEN",
  ASSIGNED = "ASSIGNED",
  COMPLETED = "COMPLETED",
}

export type Contribution = ContributionBase & ContributionStatus;

export type ContributionStatus = OpenStatus | AssignedStatus | CompletedStatus;
export type OpenContribution = Contribution & OpenStatus;
export type AssignedContribution = Contribution & AssignedStatus;
export type CompletedContribution = Contribution & CompletedStatus;

type OpenStatus = {
  status: ContributionStatusEnum.OPEN;
};

type AssignedStatus = {
  status: ContributionStatusEnum.ASSIGNED;
  metadata: {
    assignee: string;
  };
};

type CompletedStatus = {
  status: ContributionStatusEnum.COMPLETED;
  metadata: {
    assignee: string;
  };
};

export interface ContributionRepository {
  list(): Promise<Contribution[]>;
}

export const repository: ContributionRepository =
  process.env.NODE_ENV === "test" ? new InMemoryContributionRepository() : new FetchedContributionRepository();
