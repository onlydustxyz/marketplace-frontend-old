import axios from "axios";
import config from "src/config";

import { ContactInformationDto, ContactInformationRepository, ContributorId } from "./repository";

export class FetchedContactInformationRepository implements ContactInformationRepository {
  public async findByContributorId(contributorId: ContributorId): Promise<ContactInformationDto> {
    const formattedContributorId = "0x" + contributorId.toString(16);
    const response = await axios.get<ContactInformationDto>(
      `${config.DATA_API_HOSTNAME}/contributors/${formattedContributorId}/contact-information`
    );

    if (response.status !== 200) {
      throw new Error("Failed to fetch contact information");
    }
    return response.data;
  }

  public async save(contactInformation: ContactInformationDto): Promise<void> {
    const formattedContributorId = "0x" + contactInformation.contributor_id.toString(16);
    const response = await axios.put<ContactInformationDto>(
      `${config.DATA_API_HOSTNAME}/contributors/${formattedContributorId}/contact-information`,
      {
        discord_handle: contactInformation.discord_handle,
      }
    );

    if (response.status !== 204) {
      throw new Error("Failed to update contact information");
    }
  }
}
