import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { contributionsQuery } from "src/state";

const ContributionList = () => {
  const contributions = useRecoilValue(contributionsQuery);

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
