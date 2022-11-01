import { FC, forwardRef, memo } from "react";
import Contribution from "./ContributionV2";
import { ContributionWithStatus as ContributionType } from "src/state";
import { Link } from "react-router-dom";
import { Virtuoso } from "react-virtuoso";
import cn from "classnames";

type Props = {
  contributions: ContributionType[];
  className?: string;
  dataTestId?: string;
};

let ContributionList: FC<Props> = ({ className, contributions, dataTestId }) => {
  const List = forwardRef<HTMLDivElement>((props, ref) => {
    return <div data-testid={dataTestId} className={`data-testid-${dataTestId}`} {...props} ref={ref} />;
  });

  const Item = (props: Record<string, unknown>) => {
    return <div data-testid={`${dataTestId}-item`} className="mb-[10px]" {...props} />;
  };

  return (
    <Virtuoso
      className={cn("w-full", className)}
      useWindowScroll
      totalCount={contributions.length}
      overscan={5}
      components={{ Item, List }}
      itemContent={index => (
        <Link
          to={`/contributions/${contributions[index].id}`}
          data-testid={`contribution-link-${contributions[index].id}`}
        >
          <Contribution {...contributions[index]} />
        </Link>
      )}
    />
  );
};

ContributionList = memo(ContributionList);

export default ContributionList;
