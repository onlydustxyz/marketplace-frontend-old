import { InMemoryContributionRepository } from "./in-memory-repository";

export type Project = {
  id: string;
  title: string;
  description: string;
};

export type Contribution = {
  id: string;
  title: string;
  description: string;
  project: Project;
};

export interface ContributionRepository {
  list(): Promise<Contribution[]>;
}

export const repository: ContributionRepository = new InMemoryContributionRepository();
