import { ContributionDto } from "src/model/projects/repository";
import { InMemoryApplicationRepository } from "./in-memory-repository";
import { FetchedApplicationRepository } from "./fetched-repository";
import { ContributorAccountAddress } from "../contributors/repository";
import config from "src/config";

export type ContributionApplicationDto = {
  contribution_id: ContributionDto["id"];
  contributor_account_address: ContributorAccountAddress;
};

export type ListParams = {
  contributorAccountAddress: ContributorAccountAddress | undefined;
};

export type CreateParams = {
  contributionId: string;
  contributorAccountAddress: ContributorAccountAddress;
};

export interface ApplicationRepository {
  list(params: ListParams): Promise<ContributionApplicationDto[]>;
  create(params: CreateParams): Promise<boolean>;
}

export const applicationRepository: ApplicationRepository =
  config.MODE === "test" ? new InMemoryApplicationRepository() : new FetchedApplicationRepository();
