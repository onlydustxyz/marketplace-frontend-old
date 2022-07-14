import { useParams } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import ContributionDetailsPage from "./View";
import { contributionQuery, displayRegisterModalAtom, isGithubRegisteredSelector } from "src/state";
import { FC, useCallback } from "react";

type PageParams = {
  contributionId: string;
};

const ContributionDetailsPageContainer: FC = () => {
  const { contributionId } = useParams<PageParams>();
  const contribution = useRecoilValue(contributionQuery(contributionId));
  const isGithubRegistered = useRecoilValue(isGithubRegisteredSelector);
  const setDisplayRegisterModal = useSetRecoilState(displayRegisterModalAtom);

  const apply = useCallback(() => {
    if (!isGithubRegistered) {
      setDisplayRegisterModal(true);
      return;
    }

    // @TODO = implement contribution application
    console.log("Apply to contribution", contributionId);
  }, [contributionId, isGithubRegistered]);

  return <ContributionDetailsPage contribution={contribution} apply={apply} />;
};

export default ContributionDetailsPageContainer;
