import { FC } from "react";
import { useRecoilValue } from "recoil";
import ContributionList from "./View";
import {
  foreignOngoingContributionsQuery,
  foreignCompletedContributionsQuery,
  myCompletedContributionsQuery,
  myOngoingContributionsQuery,
  openedContributionsQuery,
  accountAddressAtom,
} from "src/state";

const ContributionListContainer: FC = () => {
  const accountAddress = useRecoilValue(accountAddressAtom);
  const openContributions = useRecoilValue(openedContributionsQuery);
  const myOngoingContributions = useRecoilValue(myOngoingContributionsQuery(accountAddress));
  const foreignOngoingContributions = useRecoilValue(foreignOngoingContributionsQuery(accountAddress));
  const myCompletedContributions = useRecoilValue(myCompletedContributionsQuery(accountAddress));
  const foreignCompletedContributions = useRecoilValue(foreignCompletedContributionsQuery(accountAddress));

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
