import { FC } from "react";
import { Link } from "react-router-dom";
import { Contribution as ContributionType, ContributionStatusEnum } from "src/model/contributions/repository";

type Props = ContributionType;

const Contribution: FC<Props> = contribution => {
  return (
    <div className="border border-solid border-gray p-4">
      <div className="flex">
        <Link to={`/contributions/${contribution.id}`} className="flex-1">
          <h1>{contribution.title}</h1>
        </Link>
        {contribution.status !== ContributionStatusEnum.OPEN && <div>{contribution.metadata.assignee}</div>}
      </div>
      <div>
        <i>
          <Link to={`/projects/${contribution.project.id}`}>{contribution.project.title}</Link>
        </i>
      </div>
    </div>
  );
};

export default Contribution;
