import { ApplicationRepository, ContributionApplicationDto, CreateParams, ListParams } from "./repository";

export class InMemoryApplicationRepository implements ApplicationRepository {
  private contributionsApplications: Array<ContributionApplicationDto> = [
    { contribution_id: "1", contributor_id: 1 },
    { contribution_id: "2", contributor_id: 2 },
    { contribution_id: "2", contributor_id: 38 },
    { contribution_id: "3", contributor_id: 1 },
    { contribution_id: "4", contributor_id: 38 },
  ];

  public async list({ contributorId }: ListParams): Promise<ContributionApplicationDto[]> {
    return this.contributionsApplications.filter(
      (application: ContributionApplicationDto) =>
        contributorId === undefined || application.contributor_id === contributorId
    );
  }

  public async create({ contributionId, contributorId }: CreateParams) {
    this.contributionsApplications.push({
      contribution_id: contributionId,
      contributor_id: contributorId,
    });

    return true;
  }
}
