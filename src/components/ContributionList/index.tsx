import { FC } from "react";
import Contribution from "./Contribution";
import { Contribution as ContributionType } from "src/state";
import classNames from "classnames";
import { Link } from "react-router-dom";

type Props = {
  contributions: ContributionType[];
  className?: string;
};

const ContributionList: FC<Props> = ({ className, contributions }) => {
  return (
    <ul
      className={classNames(
        "w-full grid grid-col md:grid-cols-[repeat(auto-fill,_minmax(360px,1fr))] gap-x-[3%] gap-y-2 md:gap-y-4 justify-between",
        className
      )}
    >
      {contributions.map(contribution => (
        <li key={contribution.id} className="md:my-2 w-full overflow-hidden">
          <Link to={`/contributions/${contribution.id}`} className="flex-1">
            <Contribution contribution={contribution} />
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default ContributionList;
