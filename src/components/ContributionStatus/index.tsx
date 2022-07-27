import { FC } from "react";
import cn from "classnames";

import { ContributionStatusEnum } from "src/model/projects/repository";
import { Contribution } from "src/state";

import AssignedBadge from "./AssignedBadge";
import CompletedBadge from "./CompletedBadge";
import GatedBadge from "./GatedBadge";
import OpenBadge from "./OpenBadge";

type Props = {
  gated: boolean;
  status: Contribution["status"];
  className?: string;
};

const ContributionStatus: FC<Props> = ({ className, gated, status }) => {
  const statusLabel = status === ContributionStatusEnum.OPEN && gated ? "GATED" : status;

  const statusClassName = status === ContributionStatusEnum.OPEN && !gated ? "text-white" : "text-white/50";

  return (
    <div className={cn(className, "flex flex-row items-center")}>
      {renderBadge()}
      <div className={cn("ml-2.5 text-xs", statusClassName)}>{statusLabel}</div>
    </div>
  );

  function renderBadge() {
    switch (status) {
      case ContributionStatusEnum.OPEN:
        return gated ? <GatedBadge /> : <OpenBadge />;
      case ContributionStatusEnum.ASSIGNED:
        return <AssignedBadge />;
      case ContributionStatusEnum.COMPLETED:
        return <CompletedBadge />;
    }
  }
};

export default ContributionStatus;
