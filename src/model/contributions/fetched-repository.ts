import config from "src/config";

import { ContributionRepository, ContributionDto } from "./repository";

export class FetchedContributionRepository implements ContributionRepository {
  public async list(): Promise<ContributionDto[]> {
    const endpointUrl = new URL(`${config.DATA_API_HOSTNAME}/contributions`);

    const response = await fetch(endpointUrl.toString());

    const contributions: ContributionDto[] = await response.json();

    return contributions;
  }
}
