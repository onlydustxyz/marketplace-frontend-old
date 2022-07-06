import { FakerContributionRepository } from "src/model/contributions/faker-repository";
import { InMemoryContributionRepository } from "./in-memory-repository";

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

export type Contribution = ContributionBase & ContributionStatus;

export type ContributionStatus = OpenStatus | AssignedStatus | CompletedStatus;
export type OpenContribution = Contribution & OpenStatus;
export type AssignedContribution = Contribution & AssignedStatus;
export type CompletedContribution = Contribution & CompletedStatus;

type OpenStatus = {
  status: "open";
};

type AssignedStatus = {
  status: "assigned";
  metadata: {
    assignee: string;
  };
};

type CompletedStatus = {
  status: "completed";
  metadata: {
    assignee: string;
  };
};

export interface ContributionRepository {
  list(): Promise<Contribution[]>;
}

export const repository: ContributionRepository =
  process.env.NODE_ENV === "test" ? new InMemoryContributionRepository() : new FakerContributionRepository();
