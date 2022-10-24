import { FC, memo } from "react";
import Contribution from "./Contribution";
import { ContributionWithStatus as ContributionType } from "src/state";
import cn from "classnames";
import { Link } from "react-router-dom";
import { VirtuosoGrid } from "react-virtuoso";
import { useNewUI } from "src/utils/version";
import ContributionListV2 from "./ViewV2";

type Props = {
  contributions: ContributionType[];
  className?: string;
  dataTestId?: string;
};

let ContributionList: FC<Props> = props => {
  const newUI = useNewUI();

  if (newUI) {
    return <ContributionListV2 {...props} />;
  }

  const { className, contributions, dataTestId } = props;

  return (
    <VirtuosoGrid
      className="w-full"
      useWindowScroll
      totalCount={contributions.length}
      overscan={3}
      listClassName={cn(
        "w-full grid grid-col md:grid-cols-[repeat(auto-fill,_minmax(360px,1fr))] gap-x-[3%] gap-y-2 md:gap-y-4 justify-between",
        className,
        `data-testid-${dataTestId}`
      )}
      itemClassName="md:my-2 w-full overflow-hidden"
      itemContent={index => (
        <Link
          to={`/contributions/${contributions[index].id}`}
          className="flex-1"
          data-testid={`contribution-link-${contributions[index].id}`}
        >
          <Contribution contribution={contributions[index]} />
        </Link>
      )}
    />
  );
};

ContributionList = memo(ContributionList);

export default ContributionList;
