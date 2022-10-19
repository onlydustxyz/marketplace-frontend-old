import { ContributorAccountAddress } from "../contributors/repository";
import { ApplicationRepository, ContributionApplicationDto, CreateParams, ListParams } from "./repository";

export class InMemoryApplicationRepository implements ApplicationRepository {
  private contributionsApplications: Array<ContributionApplicationDto> = [
    { contribution_id: "1", contributor_account_address: "0x00000" as ContributorAccountAddress },
    { contribution_id: "2", contributor_account_address: "0x00001" as ContributorAccountAddress },
    { contribution_id: "2", contributor_account_address: "0x123456789" as ContributorAccountAddress },
    { contribution_id: "3", contributor_account_address: "0x00000" as ContributorAccountAddress },
    { contribution_id: "4", contributor_account_address: "0x123456789" as ContributorAccountAddress },
  ];

  public async list({ contributorAccountAddress }: ListParams): Promise<ContributionApplicationDto[]> {
    return this.contributionsApplications.filter(
      (application: ContributionApplicationDto) =>
        contributorAccountAddress === undefined ||
        parseInt(application.contributor_account_address, 16) === parseInt(contributorAccountAddress, 16)
    );
  }

  public async create({ contributionId, contributorAccountAddress }: CreateParams) {
    this.contributionsApplications.push({
      contribution_id: contributionId,
      contributor_account_address: contributorAccountAddress,
    });

    return true;
  }
}
