import { FC } from "react";
import { useRecoilValue } from "recoil";
import ContributionList from "src/components/ContributionList";
import {
  foreignCompletedContributionsQuery,
  foreignOngoingContributionsQuery,
  gatedContributionsQuery,
  openedContributionsQuery,
} from "src/state";

const HomePage: FC = () => {
  const openedContributions = useRecoilValue(openedContributionsQuery);
  const gatedContributions = useRecoilValue(gatedContributionsQuery);
  const foreignOngoingContributions = useRecoilValue(foreignOngoingContributionsQuery);
  const foreignCompletedContributions = useRecoilValue(foreignCompletedContributionsQuery);

  const allContributions = [
    ...openedContributions,
    ...gatedContributions,
    ...foreignOngoingContributions,
    ...foreignCompletedContributions,
  ];

  return (
    <div className="w-full">
      <h1 className="mt-10 text-3xl font-alfreda">All contributions</h1>

      <ContributionList className="mt-16" contributions={allContributions} />
    </div>
  );
};

export default HomePage;
