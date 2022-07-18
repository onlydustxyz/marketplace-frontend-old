import { useParams } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import ContributionDetailsPage from "./View";
import {
  accountAtom,
  contributionQuery,
  displayRegisterModalAtom,
  isGithubRegisteredSelector,
  userContributorIdSelector,
  userGithubHandleSelector,
} from "src/state";
import { FC, useCallback } from "react";

type PageParams = {
  contributionId: string;
};
const ContributionDetailsPageContainer: FC = () => {
  const { contributionId } = useParams<PageParams>();
  const contribution = useRecoilValue(contributionQuery(contributionId));
  const contributorId = useRecoilValue(userContributorIdSelector);
  const account = useRecoilValue(accountAtom);
  const isGithubRegistered = useRecoilValue(isGithubRegisteredSelector);
  const userGithubHandle = useRecoilValue(userGithubHandleSelector);
  const setDisplayRegisterModal = useSetRecoilState(displayRegisterModalAtom);

  const apply = useCallback(() => {
    if (!isGithubRegistered) {
      setDisplayRegisterModal(true);
      return;
    }

    const applyUrl = `https://1q4jfbhi7he.typeform.com/to/glbmGLMH#wallet=${account?.address}&github=${userGithubHandle}&githubissue=${contribution?.github_link}&contributorid=${contributorId}`;

    window.open(applyUrl, "_blank");
  }, [contributionId, isGithubRegistered]);

  return <ContributionDetailsPage contribution={contribution} apply={apply} />;
};

export default ContributionDetailsPageContainer;
