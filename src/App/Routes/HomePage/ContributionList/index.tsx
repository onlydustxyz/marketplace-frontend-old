import { FC } from "react";
import { useRecoilValue } from "recoil";
import ContributionList from "./View";
import { contributionsQuery } from "src/state";

const ContributionListContainer: FC = () => {
  const contributions = useRecoilValue(contributionsQuery);

  return <ContributionList contributions={contributions} />;
};

export default ContributionListContainer;
