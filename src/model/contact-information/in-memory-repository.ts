import {
  ContactInformationDto,
  ContactInformationRepository,
  ContributorId,
} from "src/model/contact-information/repository";

export class InMemoryContactInformationRepository implements ContactInformationRepository {
  private contactInformationList: ContactInformationDto[] = [];

  public async findByContributorId(contributorId: ContributorId): Promise<ContactInformationDto> {
    const contactInformation = this.contactInformationList.find(
      contactInformation => contactInformation.contributor_id === contributorId
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
