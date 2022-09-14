import { FC, memo } from "react";
import Contribution from "./Contribution";
import { Contribution as ContributionType } from "src/state";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { VirtuosoGrid } from "react-virtuoso";

type Props = {
  contributions: ContributionType[];
  className?: string;
};

let ContributionList: FC<Props> = ({ className, contributions }) => {
  return (
    <VirtuosoGrid
      style={{ height: 400 }}
      useWindowScroll
      totalCount={contributions.length}
      overscan={3}
      listClassName={classNames(
        "w-full grid grid-col md:grid-cols-[repeat(auto-fill,_minmax(360px,1fr))] gap-x-[3%] gap-y-2 md:gap-y-4 justify-between",
        className
      )}
      itemClassName="md:my-2 w-full overflow-hidden"
      itemContent={index => (
        <Link to={`/contributions/${contributions[index].id}`} className="flex-1">
          <Contribution contribution={contributions[index]} />
        </Link>
      )}
    />
  );
};

ContributionList = memo(ContributionList);

export default ContributionList;
