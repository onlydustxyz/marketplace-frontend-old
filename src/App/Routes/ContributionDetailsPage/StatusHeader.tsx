import { FC } from "react";
import cn from "classnames";

import ContributionStatus from "src/components/ContributionStatus";
import { ContributionMetadataAssignee, ContributionStatusEnum } from "src/model/projects/repository";
import { Contribution } from "src/state";

type Props = {
  contribution: Contribution;
  hasAppliedToContribution: boolean;
};

const classNamesByStatus: Record<ContributionStatusEnum | "gated" | "applied", string> = {
  [ContributionStatusEnum.OPEN]: "",
  [ContributionStatusEnum.ABANDONED]: "",
  [ContributionStatusEnum.ASSIGNED]: "bg-orange/7 backdrop-blur-[6px]",
  [ContributionStatusEnum.COMPLETED]: "bg-white/4 backdrop-blur-[6px]",
  gated: "bg-[#0038FF]/10 backdrop-blur-[6px]",
  applied: "bg-[#1F96A6]/10 backdrop-blur-[6px]",
};

const StatusHeader: FC<Props> = ({ contribution, hasAppliedToContribution }) => {
  const computedStatus = computeStatus();

  return (
    <div
      className={cn(
        classNamesByStatus[computedStatus],
        "px-3 md:px-10 w-full flex flex-col md:flex-row justify-center items-start md:items-center h-[48px] md:h-[66px]"
      )}
    >
      <ContributionStatus
        status={contribution.status}
        gated={contribution.eligible === false}
        applied={hasAppliedToContribution}
      >
        {renderDetails()}
      </ContributionStatus>
    </div>
  );

  function renderDetails() {
    switch (contribution.status) {
      case ContributionStatusEnum.OPEN:
        if (contribution.eligible === false) {
          return (
            <div className="flex-grow text-center md:text-right text-xs md:text-base">
              <span>Complete {contribution.gateMissingCompletedContributions} more contributions to unlock</span>
            </div>
          );
        }
        break;
      case ContributionStatusEnum.ASSIGNED:
        return (
          <div className="flex-grow text-center md:text-right text-sm md:text-base">
            to {renderAssigneeLink(contribution.metadata)}
          </div>
        );
      case ContributionStatusEnum.COMPLETED:
        return (
          <div className="flex-grow text-center md:text-right text-sm md:text-base">
            by {renderAssigneeLink(contribution.metadata)}
          </div>
        );
      default:
        return null;
    }
  }

  function renderAssigneeLink(metadata: ContributionMetadataAssignee) {
    if (metadata.github_username) {
      return (
        <a href={`https://github.com/${metadata.github_username}`} target="_blank" className="underline">
          {metadata.github_username || "???"}
        </a>
      );
    }

    return "???";
  }

  function computeStatus() {
    if (contribution.status === ContributionStatusEnum.OPEN) {
      if (hasAppliedToContribution) {
        return "applied";
      }

      if (contribution.eligible === false) {
        return "gated";
      }
    }

    return contribution.status;
  }
};

export default StatusHeader;
