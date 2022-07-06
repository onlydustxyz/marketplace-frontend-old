import { FakerContributionRepository } from "src/model/contributions/faker-repository";
import { InMemoryContributionRepository } from "./in-memory-repository";

export type Project = {
  id: string;
  title: string;
  description: string;
  githubLink: string;
};

export type Contribution = {
  id: string;
  title: string;
  description: string;
  project: Project;
} & ContributionStatus;

export type ContributionStatus = OpenStatus | AssignedStatus | CompletedStatus;

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
};

export interface ContributionRepository {
  list(): Promise<Contribution[]>;
}

export const repository: ContributionRepository =
  process.env.NODE_ENV === "test" ? new InMemoryContributionRepository() : new FakerContributionRepository();
