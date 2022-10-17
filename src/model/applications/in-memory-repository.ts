import { ContributorAccountAddress } from "../contact-information/repository";
import { ApplicationRepository, ContributionApplicationDto, CreateParams, ListParams } from "./repository";

export class InMemoryApplicationRepository implements ApplicationRepository {
  private contributionsApplications: Array<ContributionApplicationDto> = [
    { contribution_id: "1", contributor_account: "0x00000" as ContributorAccountAddress },
    { contribution_id: "2", contributor_account: "0x00001" as ContributorAccountAddress },
    { contribution_id: "2", contributor_account: "0x123456789" as ContributorAccountAddress },
    { contribution_id: "3", contributor_account: "0x00000" as ContributorAccountAddress },
    { contribution_id: "4", contributor_account: "0x123456789" as ContributorAccountAddress },
  ];

  public async list({ contributorAccount }: ListParams): Promise<ContributionApplicationDto[]> {
    return this.contributionsApplications.filter(
      (application: ContributionApplicationDto) =>
        contributorAccount === undefined ||
        parseInt(application.contributor_account, 16) === parseInt(contributorAccount, 16)
    );
  }

  public async create({ contributionId, contributorAccount }: CreateParams) {
    this.contributionsApplications.push({
      contribution_id: contributionId,
      contributor_account: contributorAccount,
    });

    return true;
  }
}
