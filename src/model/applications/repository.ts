import { ContributionDto } from "src/model/projects/repository";
import { InMemoryApplicationRepository } from "./in-memory-repository";
import { FetchedApplicationRepository } from "./fetched-repository";
import { ContributorAccountAddress } from "../contact-information/repository";

export type ContributionApplicationDto = {
  contribution_id: ContributionDto["id"];
  contributor_account: ContributorAccountAddress;
};

export type ListParams = {
  contributorAccount: ContributorAccountAddress | undefined;
};

export type CreateParams = {
  contributionId: string;
  contributorAccount: ContributorAccountAddress;
};

export interface ApplicationRepository {
  list(params: ListParams): Promise<ContributionApplicationDto[]>;
  create(params: CreateParams): Promise<boolean>;
}

export const applicationRepository: ApplicationRepository =
  process.env.NODE_ENV === "test" ? new InMemoryApplicationRepository() : new FetchedApplicationRepository();
