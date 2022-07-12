import { FC } from "react";
import { useRecoilValue } from "recoil";
import ContributionList from "./View";
import { openedContributionsQuery } from "src/state";

const ContributionListContainer: FC = () => {
  const openedContributions = useRecoilValue(openedContributionsQuery);

  return <ContributionList contributions={openedContributions} />;
};

export default ContributionListContainer;
