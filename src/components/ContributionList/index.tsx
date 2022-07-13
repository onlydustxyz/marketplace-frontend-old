import { FC } from "react";
import Contribution from "./Contribution";
import { Contribution as ContributionType } from "src/model/contributions/repository";
import classNames from "classnames";

type Props = {
  contributions: ContributionType[];
  className?: string;
};

const ContributionList: FC<Props> = ({ className, contributions }) => {
  return (
    <ul className={classNames(className, "w-full flex flex-row gap-8 flex-wrap justify-between")}>
      {contributions.map(contribution => (
        <li key={contribution.id} className="my-2">
          <Contribution {...contribution} />
        </li>
      ))}
    </ul>
  );
};

export default ContributionList;
