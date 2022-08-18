import axios from "axios";
import config from "src/config";

import { ContactInformationDto, ContactInformationRepository, ContributorId } from "./repository";

export class FetchedContactInformationRepository implements ContactInformationRepository {
  public async findByContributorId(contributorId: ContributorId): Promise<ContactInformationDto> {
    const response = await axios.get<ContactInformationDto>(`${config.DATA_API_HOSTNAME}/contributors`, {
      params: {
        contributor_id: "0x" + contributorId.toString(16),
      },
    });

    if (response.status !== 200) {
      throw new Error("Failed to fetch contact information");
    }
    return response.data;
  }
}
