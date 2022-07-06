import { FC } from "react";
import { Link } from "react-router-dom";
import { Contribution } from "src/model/contributions/repository";

type Props = {
  contributions: Contribution[];
};

const ContributionList: FC<Props> = ({ contributions }) => {
  return (
    <ul className="mt-10">
      {contributions.map(contribution => (
        <li key={contribution.id}>
          <Link to={`/contributions/${contribution.id}`}>{contribution.title}</Link>
        </li>
      ))}
    </ul>
  );
};

export default ContributionList;
