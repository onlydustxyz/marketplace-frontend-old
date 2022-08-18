import axios from "axios";
import config from "src/config";
import { ContributionDto } from "../projects/repository";

import {
  ApplicationRepository,
  ContributionApplicationDto,
  CreateParams,
  ListFromContributionQueryParams,
  ListQueryParams,
} from "./repository";

export class FetchedApplicationRepository implements ApplicationRepository {
  public async list({ contributorId }: ListQueryParams): Promise<ContributionApplicationDto[]> {
    const endpointUrl = new URL(`${config.DATA_API_HOSTNAME}/applications`);

    if (contributorId !== undefined) {
      endpointUrl.searchParams.set("contributor_id", "0x" + contributorId.toString(16));
    }

    const response = await axios.get<ContributionApplicationDto[]>(endpointUrl.toString());

    return response.status === 200 ? response.data : [];
  }

  public async listFromContribution(
    contributionId: ContributionDto["id"],
    { contributorId }: ListFromContributionQueryParams
  ): Promise<ContributionApplicationDto[]> {
    const endpointUrl = new URL(`${config.DATA_API_HOSTNAME}/contributions/${contributionId}/applications`);
    endpointUrl.searchParams.set("contributor_id", "0x" + contributorId.toString(16));

    const response = await axios.get<ContributionApplicationDto[]>(endpointUrl.toString());

    return response.status === 200 ? response.data : [];
  }

  public async create({ contributionId, contributorId }: CreateParams) {
    const endpointUrl = new URL(`${config.DATA_API_HOSTNAME}/contributions/${contributionId}/applications`);

    const response = await axios.post(endpointUrl.toString(), {
      contributor_id: "0x" + contributorId.toString(16),
    });

    return response.status === 204;
  }
}
