import { FC } from "react";
import { Contribution, ContributionStatusEnum } from "src/model/contributions/repository";
import AssignedBadge from "./AssignedBadge";
import CompletedBadge from "./CompletedBadge";
import OpenBadge from "./OpenBadge";

type Props = {
  status: Contribution["status"];
};

const ContributionStatus: FC<Props> = ({ status }) => {
  return (
    <div className="flex flex-row items-center">
      {renderBadge(status)}
      <div className="ml-2.5 text-white/50">{status}</div>
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
