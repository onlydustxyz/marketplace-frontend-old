import { Link, useParams } from "react-router-dom";
import { useRecoilValue_TRANSITION_SUPPORT_UNSTABLE, useSetRecoilState } from "recoil";
import ContributionDetailsPage from "./View";
import {
  accountAtom,
  contributionQuery,
  displayRegisterModalAtom,
  hasContributorAppliedToContributionSelector,
  isGithubRegisteredSelector,
  userContributorIdSelector,
  userGithubHandleSelector,
} from "src/state";
import { FC, useCallback, useState } from "react";
import config from "src/config";
import { applicationRepository } from "src/model/applications/repository";
import { toastPromise } from "src/lib/toast-promise";

type PageParams = {
  contributionId: string;
};
const ContributionDetailsPageContainer: FC = () => {
  const { contributionId } = useParams<PageParams>();
  const contribution = useRecoilValue_TRANSITION_SUPPORT_UNSTABLE(contributionQuery(contributionId));
  const contributorId = useRecoilValue_TRANSITION_SUPPORT_UNSTABLE(userContributorIdSelector);
  const account = useRecoilValue_TRANSITION_SUPPORT_UNSTABLE(accountAtom);
  const isGithubRegistered = useRecoilValue_TRANSITION_SUPPORT_UNSTABLE(isGithubRegisteredSelector);
  const userGithubHandle = useRecoilValue_TRANSITION_SUPPORT_UNSTABLE(userGithubHandleSelector);
  const setDisplayRegisterModal = useSetRecoilState(displayRegisterModalAtom);
  const hasAppliedToContribution = useRecoilValue_TRANSITION_SUPPORT_UNSTABLE(
    hasContributorAppliedToContributionSelector(contributionId)
  );

  const [appliying, setApplying] = useState(false);

  const buildTypeformParams = () => {
    const typeformParams = new URLSearchParams();
    account?.address && typeformParams.set("wallet", account.address);
    userGithubHandle && typeformParams.set("github", userGithubHandle.toString(10));
    contribution?.github_link && typeformParams.set("githubissue", contribution.github_link);
    contributorId && typeformParams.set("contributorid", contributorId.toString(10));

    return typeformParams.toString();
  };

  const apply = useCallback(async () => {
    if (!isGithubRegistered || !contribution || !contributorId) {
      setDisplayRegisterModal(true);
      return;
    }
    setApplying(true);

    toastPromise(applicationRepository.create({ contributionId: contribution.id, contributorId }), {
      success: () => {
        return (
          <div className="leading-[1rem] line-clamp-3">
            Your application has been saved for the contribution{" "}
            <Link to={`/contributions/${contribution.id}`} className="italic underline">
              {contribution.title}
            </Link>
          </div>
        );
      },
      pending: () => "Your application is being processed",
      error: () => (
        <>
          An error occured while appliying to this contribution
          <br />
          Please try again
        </>
      ),
    });

    setApplying(false);
  }, [contributionId, isGithubRegistered]);

  const submit = useCallback(() => {
    const submitUrl = `${config.TYPEFORM_SUBMIT_URL}#${buildTypeformParams()}`;

    window.open(submitUrl, "_blank");
  }, [contributionId, isGithubRegistered]);

  if (!contribution) {
    return null;
  }

  return (
    <ContributionDetailsPage
      contribution={contribution}
      apply={apply}
      submit={submit}
      appliying={appliying}
      contributorId={contributorId}
      hasAppliedToContribution={hasAppliedToContribution}
    />
  );
};

export default ContributionDetailsPageContainer;
