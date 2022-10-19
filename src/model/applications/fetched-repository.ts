import axios from "axios";
import config from "src/config";

import { ApplicationRepository, ContributionApplicationDto, CreateParams, ListParams } from "./repository";

export class FetchedApplicationRepository implements ApplicationRepository {
  public async list({ contributorAccountAddress }: ListParams): Promise<ContributionApplicationDto[]> {
    const endpointUrl = new URL(`${config.DATA_API_HOSTNAME}/applications`);

    if (contributorAccountAddress !== undefined) {
      endpointUrl.searchParams.set("contributor_account_address", contributorAccountAddress);
    }

    const response = await axios.get<ContributionApplicationDto[]>(endpointUrl.toString());

    return response.status === 200 ? response.data : [];
  }

  public async create({ contributionId, contributorAccountAddress }: CreateParams) {
    const endpointUrl = new URL(`${config.DATA_API_HOSTNAME}/contributions/${contributionId}/applications`);

    const response = await axios.post(endpointUrl.toString(), {
      contributor_account_address: contributorAccountAddress,
    });

    return response.status === 204;
  }
}
