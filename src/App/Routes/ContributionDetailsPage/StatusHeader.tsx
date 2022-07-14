import { FC } from "react";
import cn from "classnames";

import ContributionStatus from "src/components/ContributionStatus";
import { Contribution, ContributionStatusEnum } from "src/model/contributions/repository";

type Props = {
  contribution: Contribution;
};

const classNamesByStatus = {
  [ContributionStatusEnum.OPEN]: "",
  [ContributionStatusEnum.ASSIGNED]: "bg-orange/7 backdrop-blur-[6px]",
  [ContributionStatusEnum.COMPLETED]: "bg-green/7 backdrop-blur-[6px]",
};

const StatusHeader: FC<Props> = ({ contribution }) => {
  return (
    <div className={cn(classNamesByStatus[contribution.status], "w-full flex items-center h-[66px]")}>
      <ContributionStatus className="mx-16" status={contribution.status} />
    </div>
  );
};

export default StatusHeader;
