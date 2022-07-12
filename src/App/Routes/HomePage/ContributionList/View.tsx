import { FC } from "react";
import Contribution from "./Contribution";
import { Contribution as ContributionType } from "src/model/contributions/repository";

type Props = {
  contributions: ContributionType[];
};

const ContributionList: FC<Props> = ({ contributions }) => {
  return (
    <div className="w-full">
      <h1 className="mt-10 text-3xl font-alfreda">All contributions</h1>

      <ul className="mt-16 w-full flex flex-row gap-10 flex-wrap justify-between">
        {contributions.map(contribution => (
          <li key={contribution.id} className="my-2">
            <Contribution {...contribution} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContributionList;
