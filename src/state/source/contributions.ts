import { selector } from "recoil";

import {
  ContributionContextEnum,
  ContributionDifficultyEnum,
  ContributionDto,
  ContributionDurationEnum,
  contributionRepository,
  ContributionStatusEnumDto,
  ContributionTypeEnum,
} from "src/model/contributions/repository";

export interface Contribution {
  id: string;
  project_id: string;
  title: string;
  description: string;
  github_link: string;
  gate: number;
  status: ContributionStatusEnumDto;
  gateMissingCompletedContributions: number;
  metadata: ContributionMetadata;
}

export type ContributionMetadata = {
  context?: ContributionContextEnum;
  difficulty?: ContributionDifficultyEnum;
  duration?: ContributionDurationEnum;
  technology?: string;
  type?: ContributionTypeEnum;
};

export const rawContributionsQuery = selector<ContributionDto[]>({
  key: "RawContributionsQuery",
  get: async () => {
    const contributionsDto = await contributionRepository.list();

    return contributionsDto;
  },
});
