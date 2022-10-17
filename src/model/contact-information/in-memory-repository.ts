import {
  ContactInformationDto,
  ContactInformationRepository,
  ContributorAccountAddress,
} from "src/model/contact-information/repository";

export class InMemoryContactInformationRepository implements ContactInformationRepository {
  private contactInformationList: ContactInformationDto[] = [
    {
      contributor_account: "0x123456789" as ContributorAccountAddress,
      discord_handle: "test_discord_handle",
    },
    {
      contributor_account:
        "0x012c0407D341F351E000b894c3a0d226Bc971caEd123eF1abb9388f6AA02AED0" as ContributorAccountAddress,
      discord_handle: "test_discord_handle",
    },
  ];

  public async findByContributorAccountAddress(
    contributorAccount: ContributorAccountAddress
  ): Promise<ContactInformationDto> {
    const contactInformation = this.contactInformationList.find(
      contactInformation => contactInformation.contributor_account === contributorAccount
    );
    if (contactInformation) {
      return contactInformation;
    }
    throw new Error("Contact information not found");
  }

  public async save(contactInformation: ContactInformationDto): Promise<void> {
    this.contactInformationList.push(contactInformation);
  }
}
