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
        "px-3 md:px-10 w-full flex flex-col md:flex-row items-center justify-center md:justify-start h-[48px] md:h-[66px]"
      )}
    >
      <ContributionStatus status={contribution.status}>{renderDetails()}</ContributionStatus>
    </div>
  );

  function renderDetails() {
    switch (contribution.status) {
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
};

export default StatusHeader;
