import { ContributionDto } from "src/model/projects/repository";
import { InMemoryApplicationRepository } from "./in-memory-repository";
import { FetchedApplicationRepository } from "./fetched-repository";

export type HasContributorAppliedToContributionParams = {
  contributionId: ContributionDto["id"];
  contributorId: number;
};

export type CreateParams = {
  contributionId: string;
  contributorId: number;
};

export interface ApplicationRepository {
  hasContributorAppliedToContribution(params: HasContributorAppliedToContributionParams): Promise<boolean>;
  create(params: CreateParams): Promise<boolean>;
}

export const applicationRepository: ApplicationRepository =
  process.env.NODE_ENV === "test" ? new InMemoryApplicationRepository() : new FetchedApplicationRepository();
