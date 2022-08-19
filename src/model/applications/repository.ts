import { ContributionDto } from "src/model/projects/repository";
import { InMemoryApplicationRepository } from "./in-memory-repository";
import { FetchedApplicationRepository } from "./fetched-repository";

export type ContributionApplicationDto = {
  id: string;
  contribution_id: ContributionDto["id"];
  contributor_id: number;
};

export type ListParams = {
  contributorId: number | undefined;
};

export type CreateParams = {
  contributionId: string;
  contributorId: number;
};

export interface ApplicationRepository {
  list(params: ListParams): Promise<ContributionApplicationDto[]>;
  create(params: CreateParams): Promise<boolean>;
}

export const applicationRepository: ApplicationRepository =
  process.env.NODE_ENV === "test" ? new InMemoryApplicationRepository() : new FetchedApplicationRepository();
