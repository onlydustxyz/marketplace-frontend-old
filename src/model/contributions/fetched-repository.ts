import config from "src/config";

import { ContributionRepository, ContributionDto, ListParams } from "./repository";

export class FetchedContributionRepository implements ContributionRepository {
  public async list({ contributorAccountAddress }: ListParams = {}): Promise<ContributionDto[]> {
    const endpointUrl = new URL(`${config.DATA_API_HOSTNAME}/contributions`);

    if (contributorAccountAddress) {
      endpointUrl.searchParams.set("contributor_account_address", contributorAccountAddress);
    }

    const response = await fetch(endpointUrl.toString());

    const contributions: ContributionDto[] = await response.json();

    return contributions;
  }
}
