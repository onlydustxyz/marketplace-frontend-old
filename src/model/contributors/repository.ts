import { InMemoryContributorRepository } from "./in-memory-repository";
import { FetchedContributorRepository } from "./fetched-repository";

export interface ContributorDto {
  id: string;
  github_identifier: string;
  github_username: string;
  account: string;
}

export interface ContributorRepository {
  findById(id: ContributorDto["id"]): Promise<ContributorDto>;
  findByAccountAddress(address: string): Promise<ContributorDto>;
}

export const contributorRepository: ContributorRepository =
  process.env.NODE_ENV === "test" ? new InMemoryContributorRepository() : new FetchedContributorRepository();
