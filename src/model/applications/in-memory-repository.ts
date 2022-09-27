import { ContributorId } from "../contact-information/repository";
import { ApplicationRepository, ContributionApplicationDto, CreateParams, ListParams } from "./repository";

export class InMemoryApplicationRepository implements ApplicationRepository {
  private contributionsApplications: Array<ContributionApplicationDto> = [
    { contribution_id: "1", contributor_id: "0x1" as ContributorId },
    { contribution_id: "2", contributor_id: "0x2" as ContributorId },
    { contribution_id: "2", contributor_id: "0x26" as ContributorId },
    { contribution_id: "3", contributor_id: "0x1" as ContributorId },
    { contribution_id: "4", contributor_id: "0x26" as ContributorId },
  ];

  public async list({ contributorId }: ListParams): Promise<ContributionApplicationDto[]> {
    return this.contributionsApplications.filter(
      (application: ContributionApplicationDto) =>
        contributorId === undefined || parseInt(application.contributor_id, 16) === parseInt(contributorId, 16)
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
