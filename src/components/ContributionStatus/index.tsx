import { FC } from "react";
import cn from "classnames";

import { Contribution, ContributionStatusEnum } from "src/model/contributions/repository";
import AssignedBadge from "./AssignedBadge";
import CompletedBadge from "./CompletedBadge";
import OpenBadge from "./OpenBadge";

type Props = {
  status: Contribution["status"];
  className?: string;
};

const ContributionStatus: FC<Props> = ({ className, status }) => {
  return (
    <div className={cn(className, "flex flex-row items-center")}>
      {renderBadge(status)}
      <div className="ml-2.5 text-white/50 text-[11px] leading-[14px]">{status}</div>
    </div>
  );

  function renderBadge(status: Props["status"]) {
    switch (status) {
      case ContributionStatusEnum.OPEN:
        return <OpenBadge />;
      case ContributionStatusEnum.ASSIGNED:
        return <AssignedBadge />;
      case ContributionStatusEnum.COMPLETED:
        return <CompletedBadge />;
    }
  }
};

export default ContributionStatus;
