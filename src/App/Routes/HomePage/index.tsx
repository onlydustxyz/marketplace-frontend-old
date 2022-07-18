import { FC } from "react";
import { useRecoilValue } from "recoil";
import ContributionList from "src/components/ContributionList";
import {
  completedContributionsQuery,
  ongoingContributionsQuery,
  gatedContributionsQuery,
  openedContributionsQuery,
} from "src/state";

const HomePage: FC = () => {
  const openedContributions = useRecoilValue(openedContributionsQuery);
  const gatedContributions = useRecoilValue(gatedContributionsQuery);
  const allOngoingContributions = useRecoilValue(ongoingContributionsQuery);
  const allCompletedContributions = useRecoilValue(completedContributionsQuery);

  const allContributions = [
    ...openedContributions,
    ...gatedContributions,
    ...allOngoingContributions,
    ...allCompletedContributions,
  ];

  return (
    <div className="w-full max-w-screen-2xl px-8">
      <h1 className="mt-10 text-3xl font-alfreda">All contributions</h1>

      <ContributionList className="mt-16" contributions={allContributions} />
    </div>
  );
};

export default HomePage;
