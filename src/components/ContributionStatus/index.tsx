import { FC, ReactNode } from "react";
import cn from "classnames";

import { ContributionWithStatus, ContributionStatusEnum } from "src/state";

import AppliedBadge from "./AppliedBadge";
import AssignedBadge from "./AssignedBadge";
import CompletedBadge from "./CompletedBadge";
import GatedBadge from "./GatedBadge";
import OpenBadge from "./OpenBadge";

type Props = {
  status: ContributionWithStatus["status"];
  className?: string;
  children?: ReactNode;
};

const ContributionStatus: FC<Props> = ({ children, className, status }) => {
  const statusClassName = computeStatusClassName();

  const statusLabel = computeStatusLabel(status);

  return (
    <div className={cn(className, "w-full flex flex-row items-center")}>
      {renderBadge()}
      <div className="flex flex-grow flex-col md:flex-row items-center">
        <div className={cn("ml-2.5 text-xs flex-grow", statusClassName)} data-testid="contribution-status-label">
          {statusLabel}
        </div>
        {children}
      </div>
    </div>
  );

  function renderBadge() {
    switch (status) {
      case ContributionStatusEnum.OPEN:
        return <OpenBadge />;
      case ContributionStatusEnum.GATED:
        return <GatedBadge />;
      case ContributionStatusEnum.APPLIED:
        return <AppliedBadge />;
      case ContributionStatusEnum.ASSIGNED:
      case ContributionStatusEnum.NO_SLOT:
        return <AssignedBadge />;
      case ContributionStatusEnum.COMPLETED:
        return <CompletedBadge />;
    }
  }

  function computeStatusClassName() {
    return status === ContributionStatusEnum.OPEN || status === ContributionStatusEnum.APPLIED
      ? "text-white"
      : "text-white/50";
  }
};

function computeStatusLabel(status: ContributionStatusEnum) {
  if (status === ContributionStatusEnum.NO_SLOT) {
    return ContributionStatusEnum.ASSIGNED;
  }

  return status;
}

export default ContributionStatus;
