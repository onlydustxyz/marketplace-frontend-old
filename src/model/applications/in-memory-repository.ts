import { ContributionDto } from "../projects/repository";
import { ApplicationRepository, CreateParams, HasContributorAppliedToContributionParams } from "./repository";

export class InMemoryApplicationRepository implements ApplicationRepository {
  private contributionsApplications: Record<ContributionDto["id"], Set<number>> = {
    "1": new Set([38]),
    "3": new Set([1]),
  };

  public async hasContributorAppliedToContribution({
    contributionId,
    contributorId,
  }: HasContributorAppliedToContributionParams) {
    return this.contributionsApplications[contributionId]?.has(contributorId);
  }

  public async create({ contributionId, contributorId }: CreateParams) {
    if (!this.contributionsApplications[contributionId]) {
      this.contributionsApplications[contributionId] = new Set<number>();
    }
    this.contributionsApplications[contributionId].add(contributorId);

    return true;
  }
}
