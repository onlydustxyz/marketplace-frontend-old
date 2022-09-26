import { FetchedContactInformationRepository } from "src/model/contact-information/fetched-repository";
import { InMemoryContactInformationRepository } from "src/model/contact-information/in-memory-repository";
import { Brand } from "src/utils/branded-types";

export type ContactInformationDto = {
  contributor_id: ContributorId;
  discord_handle: string;
};

export type ContributorId = Brand<string, "ContibutorId">;

export interface ContactInformationRepository {
  findByContributorId(contributorId: ContributorId): Promise<ContactInformationDto>;
  save(contactInformation: ContactInformationDto): Promise<void>;
}

export const contactInformationRepository: ContactInformationRepository =
  process.env.NODE_ENV === "test"
    ? new InMemoryContactInformationRepository()
    : new FetchedContactInformationRepository();
