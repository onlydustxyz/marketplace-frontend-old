import { ContributorAccountAddress } from "../contributors/repository";
import { AssignementRepository, AssignementDto, ListParams, AssignementStatusDtoEnum } from "./types";

export const inMermoryAssignements: Array<AssignementDto> = [
  {
    contribution_id: "2",
    contributor_account_address: "0x8888" as ContributorAccountAddress,
    status: AssignementStatusDtoEnum.COMPLETED,
  },
  {
    contribution_id: "6",
    contributor_account_address: "0x123456789" as ContributorAccountAddress,
    status: AssignementStatusDtoEnum.IN_PROGRESS,
  },
  {
    contribution_id: "7",
    contributor_account_address: "0x9999" as ContributorAccountAddress,
    status: AssignementStatusDtoEnum.COMPLETED,
  },
  {
    contribution_id: "7",
    contributor_account_address: "0x9998" as ContributorAccountAddress,
    status: AssignementStatusDtoEnum.COMPLETED,
  },
  {
    contribution_id: "7",
    contributor_account_address: "0x9997" as ContributorAccountAddress,
    status: AssignementStatusDtoEnum.COMPLETED,
  },
  {
    contribution_id: "8",
    contributor_account_address: "0x777" as ContributorAccountAddress,
    status: AssignementStatusDtoEnum.COMPLETED,
  },
  {
    contribution_id: "8",
    contributor_account_address: "0x999" as ContributorAccountAddress,
    status: AssignementStatusDtoEnum.IN_PROGRESS,
  },
  {
    contribution_id: "10",
    contributor_account_address: "0x123456789" as ContributorAccountAddress,
    status: AssignementStatusDtoEnum.COMPLETED,
  },
  {
    contribution_id: "10",
    contributor_account_address: "0x999" as ContributorAccountAddress,
    status: AssignementStatusDtoEnum.COMPLETED,
  },
  {
    contribution_id: "11",
    contributor_account_address: "0x888" as ContributorAccountAddress,
    status: AssignementStatusDtoEnum.COMPLETED,
  },
  {
    contribution_id: "13",
    contributor_account_address: "0x888" as ContributorAccountAddress,
    status: AssignementStatusDtoEnum.COMPLETED,
  },
  {
    contribution_id: "13",
    contributor_account_address: "0x777" as ContributorAccountAddress,
    status: AssignementStatusDtoEnum.COMPLETED,
  },
  {
    contribution_id: "14",
    contributor_account_address: "0x666" as ContributorAccountAddress,
    status: AssignementStatusDtoEnum.IN_PROGRESS,
  },
  {
    contribution_id: "14",
    contributor_account_address: "0x777" as ContributorAccountAddress,
    status: AssignementStatusDtoEnum.COMPLETED,
  },
  {
    contribution_id: "15",
    contributor_account_address: "0x8888" as ContributorAccountAddress,
    status: AssignementStatusDtoEnum.IN_PROGRESS,
  },
  {
    contribution_id: "16",
    contributor_account_address: "0x123456789" as ContributorAccountAddress,
    status: AssignementStatusDtoEnum.IN_PROGRESS,
  },
  {
    contribution_id: "17",
    contributor_account_address: "0x123456789" as ContributorAccountAddress,
    status: AssignementStatusDtoEnum.COMPLETED,
  },
  {
    contribution_id: "18",
    contributor_account_address: "0x123456789" as ContributorAccountAddress,
    status: AssignementStatusDtoEnum.COMPLETED,
  },
];

export class InMemoryAssignementRepository implements AssignementRepository {
  public async list({ contributorAccountAddress }: ListParams = {}): Promise<AssignementDto[]> {
    if (!contributorAccountAddress) {
      return inMermoryAssignements;
    }

    return inMermoryAssignements.filter(
      (application: AssignementDto) =>
        contributorAccountAddress === undefined ||
        parseInt(application.contributor_account_address, 16) === parseInt(contributorAccountAddress, 16)
    );
  }
}
