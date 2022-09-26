import axios from "axios";
import config from "src/config";

import { ApplicationRepository, ContributionApplicationDto, CreateParams, ListParams } from "./repository";

export class FetchedApplicationRepository implements ApplicationRepository {
  public async list({ contributorId }: ListParams): Promise<ContributionApplicationDto[]> {
    const endpointUrl = new URL(`${config.DATA_API_HOSTNAME}/applications`);

    if (contributorId !== undefined) {
      endpointUrl.searchParams.set("contributor_id", contributorId);
    }

    const response = await axios.get<ContributionApplicationDto[]>(endpointUrl.toString());

    return response.status === 200 ? response.data : [];
  }

  public async create({ contributionId, contributorId }: CreateParams) {
    const endpointUrl = new URL(`${config.DATA_API_HOSTNAME}/contributions/${contributionId}/applications`);

    const response = await axios.post(endpointUrl.toString(), {
      contributor_id: contributorId,
    });

    return response.status === 204;
  }
}
