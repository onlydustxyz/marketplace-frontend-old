import { FC } from "react";
import { Link } from "react-router-dom";
import { Contribution } from "src/model/contributions/repository";

type Props = {
  contributions: Contribution[];
};

const ContributionList: FC<Props> = ({ contributions }) => {
  return (
    <ul>
      {contributions.map(contribution => (
        <li key={contribution.id} className="my-4">
          <Link to={`/contributions/${contribution.id}`}>
            <h1>{contribution.title}</h1>
            <p>{contribution.status}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default ContributionList;
