import { Brand } from "src/utils/branded-types";
import { InMemoryContributorRepository } from "./in-memory-repository";
import { FetchedContributorRepository } from "./fetched-repository";
import config from "src/config";

export type ContributorAccountAddress = Brand<string, "ContributorAccountAddress">;

export interface ContributorDto {
  id: ContributorAccountAddress;
  account: ContributorAccountAddress;
  github_identifier: string;
  github_username: string;
  discord_handle: string | null;
}
export interface RegisterGithubAccount {
  address: string;
  code: string;
  hash: string;
  signature: [string, string];
}
export interface RegisterDiscordHandleParams {
  contributorAccount: ContributorAccountAddress;
  discordHandle: string;
}
export interface ContributorRepository {
  findByAccountAddress(contributorAccountAddress: ContributorAccountAddress): Promise<ContributorDto>;
  registerGithubAccount: (data: RegisterGithubAccount) => Promise<void>;
  registerDiscordHandle: (data: RegisterDiscordHandleParams) => Promise<void>;
}

export const contributorRepository: ContributorRepository =
  config.MODE === "test" ? new InMemoryContributorRepository() : new FetchedContributorRepository();
