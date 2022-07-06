import { FC } from "react";
import Contribution from "./Contribution";
import { AssignedContribution, CompletedContribution, OpenContribution } from "src/model/contributions/repository";

type Props = {
  openContributions: OpenContribution[];
  myOngoingContributions: AssignedContribution[];
  foreignOngoingContributions: AssignedContribution[];
  myCompletedContributions: CompletedContribution[];
  foreignCompletedContributions: CompletedContribution[];
};

const ContributionList: FC<Props> = ({
  openContributions,
  myOngoingContributions,
  foreignOngoingContributions,
  myCompletedContributions,
  foreignCompletedContributions,
}) => {
  return (
    <div className="w-full">
      <h1 className="mt-8 mb-4 text-xl">Open contributions</h1>
      <ul>
        {openContributions.map(contribution => (
          <li key={contribution.id} className="my-2">
            <Contribution {...contribution} />
          </li>
        ))}
      </ul>
      <h1 className="mt-8 mb-4 text-xl">My ongoing contributions</h1>
      <ul>
        {myOngoingContributions.map(contribution => (
          <li key={contribution.id} className="my-2">
            <Contribution {...contribution} />
          </li>
        ))}
      </ul>
      <h1 className="mt-8 mb-4 text-xl">Other ongoing contributions</h1>
      <ul>
        {foreignOngoingContributions.map(contribution => (
          <li key={contribution.id} className="my-2">
            <Contribution {...contribution} />
          </li>
        ))}
      </ul>
      <h1 className="mt-8 mb-4 text-xl">My completed contributions</h1>
      <ul>
        {myCompletedContributions.map(contribution => (
          <li key={contribution.id} className="my-2">
            <Contribution {...contribution} />
          </li>
        ))}
      </ul>
      <h1 className="mt-8 mb-4 text-xl">Other completed contributions</h1>
      <ul>
        {foreignCompletedContributions.map(contribution => (
          <li key={contribution.id} className="my-2">
            <Contribution {...contribution} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContributionList;
