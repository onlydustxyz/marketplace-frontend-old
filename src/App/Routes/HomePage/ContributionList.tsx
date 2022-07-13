import { FC } from "react";
import { useRecoilValue } from "recoil";
import ContributionList from "src/components/ContributionList";
import { openedContributionsQuery } from "src/state";

const ContributionListContainer: FC = () => {
  const openedContributions = useRecoilValue(openedContributionsQuery);

  return (
    <div className="w-full">
      <h1 className="mt-10 text-3xl font-alfreda">All contributions</h1>

      <ContributionList className="mt-16" contributions={openedContributions} />
    </div>
  );
};

export default ContributionListContainer;
