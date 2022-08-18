import {
  ContactInformationDto,
  ContactInformationRepository,
  ContributorId,
} from "src/model/contact-information/repository";

export class InMemoryContactInformationRepository implements ContactInformationRepository {
  public async findByContributorId(contributorId: ContributorId): Promise<ContactInformationDto> {
    const contributorFound = Math.random() > 0.5;
    if (!contributorFound) {
      throw new Error("Contributor not found");
    }
    return {
      contributor_id: contributorId,
      discord_handle: "georges_moustaki#123",
    };
  }
}
