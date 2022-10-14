import { ContributorAccountAddress } from "../contact-information/repository";
import { ContributionDto } from "../contributions/repository";

export enum AssignementStatusDto {
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
}

export type AssignementDto = {
  contribution_id: ContributionDto["id"];
  contributor_account_address: ContributorAccountAddress;
  status: AssignementStatusDto;
};
