import axios from "axios";
import config from "src/config";

import { ContributorDto, ContributorRepository } from "./repository";

export class FetchedContributorRepository implements ContributorRepository {
  public async findById(id: ContributorDto["id"]): Promise<ContributorDto> {
    const response = await axios.get<ContributorDto>(`${config.DATA_API_HOSTNAME}/contributors/${id}`);

    if (response.status !== 200) {
      throw new Error("Failed to fetch contributor");
    }
    return response.data;
  }

  public async findByAccountAddress(address: string): Promise<ContributorDto> {
    const response = await axios.get<ContributorDto>(
      `${config.DATA_API_HOSTNAME}/contributors?contributor_account=${address}`
    );

    if (response.status !== 200) {
      throw new Error("Failed to fetch contributor");
    }
    return response.data;
  }
}
