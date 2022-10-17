import axios from "axios";
import config from "src/config";

import { ApplicationRepository, ContributionApplicationDto, CreateParams, ListParams } from "./repository";

export class FetchedApplicationRepository implements ApplicationRepository {
  public async list({ contributorAccount }: ListParams): Promise<ContributionApplicationDto[]> {
    const endpointUrl = new URL(`${config.DATA_API_HOSTNAME}/applications`);

    if (contributorAccount !== undefined) {
      endpointUrl.searchParams.set("contributor_account", contributorAccount);
    }

    const response = await axios.get<ContributionApplicationDto[]>(endpointUrl.toString());

    return response.status === 200 ? response.data : [];
  }

  public async create({ contributionId, contributorAccount }: CreateParams) {
    const endpointUrl = new URL(`${config.DATA_API_HOSTNAME}/contributions/${contributionId}/applications`);

    const response = await axios.post(endpointUrl.toString(), {
      contributor_account: contributorAccount,
    });

    return response.status === 204;
  }
}
