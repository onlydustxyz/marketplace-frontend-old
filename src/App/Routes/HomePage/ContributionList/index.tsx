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
import { useStarknet } from "@starknet-react/core";

const ContributionListContainer: FC = () => {
  const { account } = useStarknet();
  const openContributions = useRecoilValue(openedContributionsQuery);
  const myOngoingContributions = useRecoilValue(myOngoingContributionsQuery(account));
  const foreignOngoingContributions = useRecoilValue(foreignOngoingContributionsQuery(account));
  const myCompletedContributions = useRecoilValue(myCompletedContributionsQuery(account));
  const foreignCompletedContributions = useRecoilValue(foreignCompletedContributionsQuery(account));

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
