import { FC } from "react";
import { useRecoilValue } from "recoil";
import ContributionList from "./View";
import {
  foreignOngoingContributionsQuery,
  foreignCompletedContributionsQuery,
  myCompletedContributionsQuery,
  myOngoingContributionsQuery,
  openedContributionsQuery,
} from "src/state";

const ContributionListContainer: FC = () => {
  const openContributions = useRecoilValue(openedContributionsQuery);
  const myOngoingContributions = useRecoilValue(myOngoingContributionsQuery);
  const foreignOngoingContributions = useRecoilValue(foreignOngoingContributionsQuery);
  const myCompletedContributions = useRecoilValue(myCompletedContributionsQuery);
  const foreignCompletedContributions = useRecoilValue(foreignCompletedContributionsQuery);

  return (
    <ContributionList
      openContributions={openContributions}
      myOngoingContributions={myOngoingContributions}
      foreignOngoingContributions={foreignOngoingContributions}
      myCompletedContributions={myCompletedContributions}
      foreignCompletedContributions={foreignCompletedContributions}
    />
  );
};

export default ContributionListContainer;
