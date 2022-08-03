import axios from "axios";
import config from "src/config";
import { padLeft } from "starknet/dist/utils/encode";

import { ApplicationRepository, CreateParams, HasContributorAppliedToContributionParams } from "./repository";

export class FetchedApplicationRepository implements ApplicationRepository {
  public async hasContributorAppliedToContribution({
    contributionId,
    contributorId,
  }: HasContributorAppliedToContributionParams): Promise<boolean> {
    const endpointUrl = new URL(`${config.DATA_API_HOSTNAME}/contributions/${contributionId}/applications`);
    endpointUrl.searchParams.set("contributorId", contributorId.toString(10));

    const response = await fetch(endpointUrl.toString());

    return response.status === 200;
  }

  public async create({ contributionId, contributorId }: CreateParams) {
    const endpointUrl = new URL(`${config.DATA_API_HOSTNAME}/contributions/${contributionId}/applications`);

    const response = await axios.post(endpointUrl.toString(), {
      contributor_id: padLeft(contributorId.toString(16), 64),
    });

    return response.status === 204;
  }
}
