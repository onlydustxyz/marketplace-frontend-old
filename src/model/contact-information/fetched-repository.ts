import axios from "axios";
import config from "src/config";

import { ContactInformationDto, ContactInformationRepository, ContributorAccountAddress } from "./repository";

export class FetchedContactInformationRepository implements ContactInformationRepository {
  public async findByContributorAccountAddress(
    contributorAddress: ContributorAccountAddress
  ): Promise<ContactInformationDto> {
    const response = await axios.get<ContactInformationDto>(
      `${config.DATA_API_HOSTNAME}/contributors/${contributorAddress}/contact-information`
    );

    if (response.status !== 200) {
      throw new Error("Failed to fetch contact information");
    }
    return response.data;
  }

  public async save(contactInformation: ContactInformationDto): Promise<void> {
    const formattedContributorAccountAddress = contactInformation.contributor_account;
    const response = await axios.put<ContactInformationDto>(
      `${config.DATA_API_HOSTNAME}/contributors/${formattedContributorAccountAddress}/contact-information`,
      {
        discord_handle: contactInformation.discord_handle,
      }
    );

    if (response.status !== 204) {
      throw new Error("Failed to update contact information");
    }
  }
}
