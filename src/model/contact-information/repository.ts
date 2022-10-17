import { FetchedContactInformationRepository } from "src/model/contact-information/fetched-repository";
import { InMemoryContactInformationRepository } from "src/model/contact-information/in-memory-repository";
import { Brand } from "src/utils/branded-types";

export type ContactInformationDto = {
  contributor_account: ContributorAccountAddress;
  discord_handle: string;
};

export type ContributorAccountAddress = Brand<string, "ContributorAccountAddress">;

export interface ContactInformationRepository {
  findByContributorAccountAddress(contributorAccount: ContributorAccountAddress): Promise<ContactInformationDto>;
  save(contactInformation: ContactInformationDto): Promise<void>;
}

export const contactInformationRepository: ContactInformationRepository =
  process.env.NODE_ENV === "test"
    ? new InMemoryContactInformationRepository()
    : new FetchedContactInformationRepository();
