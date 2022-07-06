import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import ContributionDetailsPage from "./View";
import { contributionQuery } from "src/state";
import { FC } from "react";

type PageParams = {
  contributionId: string;
};

const ContributionDetailsPageContainer: FC = () => {
  const { contributionId } = useParams<PageParams>();
  const contribution = useRecoilValue(contributionQuery(contributionId));

  return <ContributionDetailsPage contribution={contribution} />;
};

export default ContributionDetailsPageContainer;
