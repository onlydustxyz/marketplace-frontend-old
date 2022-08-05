import { ContributionDto } from "../projects/repository";
import { ApplicationRepository, CreateParams, ListFromContributionQueryParams } from "./repository";

let indexId = 3;
export class InMemoryApplicationRepository implements ApplicationRepository {
  private contributionsApplications: Record<ContributionDto["id"], Array<{ id: string; contributor_id: number }>> = {
    "1": [
      { id: "1", contributor_id: 38 },
      { id: "1", contributor_id: 39 },
    ],
    "3": [{ id: "2", contributor_id: 1 }],
  };

  public async listFromContribution(
    contributionId: ContributionDto["id"],
    { contributorId }: ListFromContributionQueryParams
  ) {
    return (this.contributionsApplications[contributionId] || [])
      .filter(application => {
        if (!contributorId) {
          return true;
        }

        return application.contributor_id === contributorId;
      })
      .map(application => ({
        ...application,
        contribution_id: contributionId,
      }));
  }

  public async create({ contributionId, contributorId }: CreateParams) {
    if (!this.contributionsApplications[contributionId]) {
      this.contributionsApplications[contributionId] = [];
    }

    this.contributionsApplications[contributionId].push({ id: indexId.toString(), contributor_id: contributorId });

    indexId++;

    return true;
  }
}
