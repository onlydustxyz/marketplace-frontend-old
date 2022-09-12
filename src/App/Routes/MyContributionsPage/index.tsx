import { FC } from "react";
import { useRecoilValue_TRANSITION_SUPPORT_UNSTABLE } from "recoil";
import Button from "src/components/Button";
import ContributionList from "src/components/ContributionList";
import { myCompletedContributionsQuery, myOngoingContributionsQuery } from "src/state";

const MyContributionsPage: FC = () => {
  const ongoingContributions = useRecoilValue_TRANSITION_SUPPORT_UNSTABLE(myOngoingContributionsQuery);
  const completedContributions = useRecoilValue_TRANSITION_SUPPORT_UNSTABLE(myCompletedContributionsQuery);

  const allMyContributions = [...ongoingContributions, ...completedContributions];

  if (allMyContributions.length === 0) {
    return (
      <div className="mt-32 flex flex-col items-center">
        <div className="text-3xl text-light-blue/50 text-center">You don't have contributions yet</div>
        <Button className="mt-8" href="/">
          Start contributing
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-screen-2xl px-8">
      <h1 className="mt-10 text-3xl font-alfreda">My contributions</h1>

      <ContributionList className="mt-16" contributions={allMyContributions} />
    </div>
  );
};

export default MyContributionsPage;
