import { FC, ReactNode } from "react";
import cn from "classnames";

import { ContributionStatusEnum } from "src/model/projects/repository";
import { Contribution } from "src/state";

import AppliedBadge from "./AppliedBadge";
import AssignedBadge from "./AssignedBadge";
import CompletedBadge from "./CompletedBadge";
import GatedBadge from "./GatedBadge";
import OpenBadge from "./OpenBadge";

type Props = {
  gated: boolean;
  status: Contribution["status"];
  className?: string;
  applied: boolean;
  children?: ReactNode;
};

const ContributionStatus: FC<Props> = ({ applied, children, className, gated, status }) => {
  const statusLabel = computeStatusLabel();

  const statusClassName = computeStatusClassName();

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
        return applied ? <AppliedBadge /> : gated ? <GatedBadge /> : <OpenBadge />;
      case ContributionStatusEnum.ASSIGNED:
        return <AssignedBadge />;
      case ContributionStatusEnum.COMPLETED:
        return <CompletedBadge />;
    }
  }

  function computeStatusLabel() {
    if (status === ContributionStatusEnum.OPEN) {
      if (applied) {
        return "APPLIED";
      }

      if (gated) {
        return "GATED";
      }
    }

    return status;
  }

  function computeStatusClassName() {
    return status === ContributionStatusEnum.OPEN && !gated ? "text-white" : "text-white/50";
  }
};

export default ContributionStatus;
