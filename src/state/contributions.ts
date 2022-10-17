import { GetRecoilValue, selector, selectorFamily } from "recoil";
import { ContributionApplicationDto } from "src/model/applications/repository";
import { AssignementDto, AssignementStatusDto } from "src/model/assingments/repository";
import {
  ContributionContextEnum,
  ContributionDifficultyEnum,
  ContributionDto,
  ContributionDurationEnum,
  ContributionStatusEnumDto,
  ContributionTypeEnum,
} from "src/model/contributions/repository";
import { ContributorDto } from "src/model/contributors/repository";
import { ProjectDto } from "src/model/projects/repository";
import { contributorApplicationForContribution } from "./source/applications";
import { completedAssignementsAmountState } from "./source/assignements";
import { rawContributionsQuery } from "./source/contributions";
import { rawContributorQuery } from "./source/contributor";
import { rawProjectQuery } from "./source/projects";

export type ContributionMetadata = {
  context?: ContributionContextEnum;
  difficulty?: ContributionDifficultyEnum;
  duration?: ContributionDurationEnum;
  technology?: string;
  type?: ContributionTypeEnum;
};

export enum ContributionStatusEnum {
  OPEN = "OPEN",
  GATED = "GATED",
  NO_SLOT = "NO_SLOT",
  APPLIED = "APPLIED",
  ASSIGNED = "ASSIGNED",
  COMPLETED = "COMPLETED",
  FULFILLED = "FULFILLED",
  CLOSED = "CLOSED",
}

const contributionStatusPriority: Record<ContributionStatusEnum, number> = {
  [ContributionStatusEnum.OPEN]: 1,
  [ContributionStatusEnum.GATED]: 2,
  [ContributionStatusEnum.APPLIED]: 3,
  [ContributionStatusEnum.NO_SLOT]: 4,
  [ContributionStatusEnum.ASSIGNED]: 5,
  [ContributionStatusEnum.COMPLETED]: 6,
  [ContributionStatusEnum.FULFILLED]: 7,
  [ContributionStatusEnum.CLOSED]: 8,
};

export interface ContributionWithStatus {
  id: ContributionDto["id"];
  project_id: ContributionDto["project_id"];
  title: ContributionDto["title"];
  description: ContributionDto["description"];
  github_link: ContributionDto["github_link"];
  gate: ContributionDto["gate"];
  status: ContributionStatusEnum;
  gateMissingCompletedContributions: number;
  metadata: ContributionMetadata;
  available_slot_count: number;
  max_slot_count: number | null;
  project: {
    logo?: ProjectDto["logo"];
    title: ProjectDto["title"];
    members: ProjectDto["members"];
  };
}

export const contributionsWithStatusState = selector({
  key: "ContributionsWithStatusState",
  get: ({ get }) => {
    const rawContributions = get(rawContributionsQuery);

    const finalControbitions = rawContributions
      .map(buildContributionFormatter({ get }))
      .sort(sortContributionsByStatus);

    return finalControbitions;
  },
});

function sortContributionsByStatus(c1: ContributionWithStatus, c2: ContributionWithStatus) {
  if (contributionStatusPriority[c1.status] === contributionStatusPriority[c2.status]) {
    return 0;
  }

  return contributionStatusPriority[c1.status] > contributionStatusPriority[c2.status] ? 1 : -1;
}

export const projectContributionsState = selectorFamily({
  key: "ProjectContributions",
  get:
    (projectId: ProjectDto["id"] | undefined) =>
    ({ get }) => {
      if (!projectId) {
        return [];
      }

      const contributions = get(contributionsWithStatusState);
      return contributions
        .filter(contribution => contribution.project_id === projectId)
        .filter(contribution => contribution.status !== ContributionStatusEnum.CLOSED);
    },
});

function buildContributionFormatter({ get }: { get: GetRecoilValue }) {
  return (rawContribution: ContributionDto): ContributionWithStatus => {
    const rawContributor = get(rawContributorQuery);
    const rawProject = get(rawProjectQuery(rawContribution.project_id));

    const contributionApplication = get(contributorApplicationForContribution(rawContribution.id));

    const rawAssignements: AssignementDto[] = [];

    if (rawContribution.status === ContributionStatusEnumDto.COMPLETED) {
      rawAssignements.push({
        contribution_id: rawContribution.id,
        contributor_account_address: rawContribution.metadata.assignee,
        status: AssignementStatusDto.COMPLETED,
      });
    } else if (rawContribution.status === ContributionStatusEnumDto.ASSIGNED) {
      rawAssignements.push({
        contribution_id: rawContribution.id,
        contributor_account_address: rawContribution.metadata.assignee,
        status: AssignementStatusDto.IN_PROGRESS,
      });
    }

    const nbCompletedAssignements = get(completedAssignementsAmountState);

    const contributorRawAssignement = rawAssignements.find(
      assignement => assignement.contributor_account_address === rawContributor?.account
    );

    const availableSlotCount = [ContributionStatusEnumDto.ASSIGNED, ContributionStatusEnumDto.COMPLETED].includes(
      rawContribution.status
    )
      ? 0
      : 1;
    const maxSlotCount = 1;

    return {
      ...rawContribution,
      status: computeContributionStatus({
        rawContribution: { ...rawContribution, available_slot_count: availableSlotCount, max_slot_count: maxSlotCount },
        rawApplication: contributionApplication,
        rawAssignements,
        contributorRawAssignement: contributorRawAssignement
          ? {
              ...contributorRawAssignement,
              status:
                rawContribution.status === ContributionStatusEnumDto.COMPLETED
                  ? AssignementStatusDto.COMPLETED
                  : AssignementStatusDto.IN_PROGRESS,
            }
          : undefined,
        rawContributor,
        nbCompletedAssignements,
      }),
      gateMissingCompletedContributions: rawContribution.gate - nbCompletedAssignements,
      available_slot_count: availableSlotCount,
      max_slot_count: maxSlotCount,
      project: {
        logo: rawProject?.logo,
        title: rawProject?.title || "",
        members: rawProject?.members || [],
      },
    };
  };
}

interface ComputeContributionStatusParams {
  rawContribution: ContributionDto & { available_slot_count: number; max_slot_count: number };
  rawApplication?: ContributionApplicationDto;
  rawAssignements: AssignementDto[];
  contributorRawAssignement?: AssignementDto;
  rawContributor: ContributorDto | undefined;
  nbCompletedAssignements: number;
}

function computeContributionStatus({
  rawContribution,
  rawContributor,
  rawApplication,
  rawAssignements,
  contributorRawAssignement,
  nbCompletedAssignements,
}: ComputeContributionStatusParams): ContributionStatusEnum {
  if (contributorRawAssignement?.status === AssignementStatusDto.COMPLETED) {
    return ContributionStatusEnum.COMPLETED;
  }

  if (
    rawAssignements.length > 0 &&
    !rawAssignements.some(rawAssignement => rawAssignement.status !== AssignementStatusDto.COMPLETED)
  ) {
    return ContributionStatusEnum.FULFILLED;
  }

  if (rawContribution.closed) {
    return ContributionStatusEnum.CLOSED;
  }

  if (contributorRawAssignement?.status === AssignementStatusDto.IN_PROGRESS) {
    return ContributionStatusEnum.ASSIGNED;
  }

  if (rawContribution.available_slot_count === 0) {
    return ContributionStatusEnum.NO_SLOT;
  }

  if (rawApplication) {
    return ContributionStatusEnum.APPLIED;
  }

  if (rawContributor === undefined ? false : nbCompletedAssignements < rawContribution.gate) {
    return ContributionStatusEnum.GATED;
  }

  return ContributionStatusEnum.OPEN;
}
