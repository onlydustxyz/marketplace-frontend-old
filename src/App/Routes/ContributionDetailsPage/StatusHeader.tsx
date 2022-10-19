import { FC } from "react";
import cn from "classnames";

import { ContributionWithStatus } from "src/state";
import { ContributionStatusEnum } from "src/state";
import ContributionStatus from "src/components/ContributionStatus";

type Props = {
  contribution: ContributionWithStatus;
};

const classNamesByStatus: Record<ContributionStatusEnum, string> = {
  [ContributionStatusEnum.OPEN]: "",
  [ContributionStatusEnum.NO_SLOT]: "bg-orange/7 backdrop-blur-[6px]",
  [ContributionStatusEnum.ASSIGNED]: "bg-orange/7 backdrop-blur-[6px]",
  [ContributionStatusEnum.COMPLETED]: "bg-white/4 backdrop-blur-[6px]",
  [ContributionStatusEnum.FULFILLED]: "bg-white/4 backdrop-blur-[6px]",
  [ContributionStatusEnum.CLOSED]: "bg-white/4 backdrop-blur-[6px]",
  [ContributionStatusEnum.GATED]: "bg-[#0038FF]/10 backdrop-blur-[6px]",
  [ContributionStatusEnum.APPLIED]: "bg-[#1F96A6]/10 backdrop-blur-[6px]",
};

const StatusHeader: FC<Props> = ({ contribution }) => {
  return (
    <div
      className={cn(
        classNamesByStatus[contribution.status],
        "px-3 md:px-10 w-full flex flex-col md:flex-row justify-center items-start md:items-center h-[48px] md:h-[66px]"
      )}
    >
      <ContributionStatus status={contribution.status}>{renderDetails()}</ContributionStatus>
    </div>
  );

  function renderDetails() {
    switch (contribution.status) {
      case ContributionStatusEnum.OPEN:
        if (contribution.max_slot_count === 1) {
          return null;
        }

        return (
          <div
            className="flex flex-col flex-grow text-center md:text-right text-xs md:text-base"
            data-testid="contribution-status-details"
          >
            {renderAvailableAssignementsDetails(contribution.available_slot_count)}
            {renderContributorsAssignementsDetails(contribution.assignements_count)}
          </div>
        );

        break;
      case ContributionStatusEnum.ASSIGNED:
      case ContributionStatusEnum.NO_SLOT:
      case ContributionStatusEnum.APPLIED:
        return (
          <div
            className="flex-grow text-center md:text-right text-xs md:text-base"
            data-testid="contribution-status-details"
          >
            {renderContributorsAssignementsDetails(contribution.assignements_count)}
          </div>
        );
        break;
      case ContributionStatusEnum.GATED:
        return (
          <div
            className="flex-grow text-center md:text-right text-xs md:text-base"
            data-testid="contribution-status-details"
          >
            <span>Complete {contribution.gateMissingCompletedContributions} more contributions to unlock</span>
          </div>
        );
      default:
        return null;
    }
  }

  function renderAvailableAssignementsDetails(availableSlotCount: number) {
    if (availableSlotCount === 0) {
      return <span>No assignements available</span>;
    }

    return (
      <span>
        {availableSlotCount} remaining {availableSlotCount === 1 ? "assignement" : "assignements"}
      </span>
    );
  }

  function renderContributorsAssignementsDetails(assignementsCount: number) {
    if (assignementsCount === 0) {
      return null;
    }

    return (
      <span className="text-sm text-white/40">
        {assignementsCount} {assignementsCount === 1 ? "contributor" : "contributors"} assigned
      </span>
    );
  }
};

export default StatusHeader;
