import { Link, useParams } from "react-router-dom";
import { useRecoilRefresher_UNSTABLE, useRecoilValue_TRANSITION_SUPPORT_UNSTABLE, useSetRecoilState } from "recoil";
import ContributionDetailsPage from "./View";
import {
  accountAtom,
  contributionQuery,
  displayRegisterModalAtom,
  isGithubRegisteredSelector,
  userContributorIdSelector,
  userDiscordHandleSelector,
  userGithubHandleSelector,
  contributionsQuery,
} from "src/state";
import { FC, startTransition, useCallback, useState } from "react";
import config from "src/config";
import { applicationRepository } from "src/model/applications/repository";
import { toastPromise } from "src/lib/toast-promise";
import NotFoundError from "./NotFoundError";

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
  const userDiscordHandle = useRecoilValue_TRANSITION_SUPPORT_UNSTABLE(userDiscordHandleSelector);
  const setDisplayRegisterModal = useSetRecoilState(displayRegisterModalAtom);
  const hasAppliedToContribution = !!contribution?.applied;

  const refreshApplication = useRecoilRefresher_UNSTABLE(contributionsQuery);
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
    const backEndApply: boolean = config.FEATURE_BACKEND_APPLY;

    if (backEndApply) {
      if (
        !isGithubRegistered ||
        contribution === undefined ||
        contributorId === undefined ||
        userDiscordHandle === undefined
      ) {
        setDisplayRegisterModal(true);
        return;
      }

      setApplying(true);

      toastPromise(applicationRepository.create({ contributionId: contribution.id, contributorId }), {
        success: () => {
          return (
            <div className="leading-[1rem] line-clamp-3">
              Thank you for your application for{" "}
              <Link to={`/contributions/${contribution.id}`} className="italic underline">
                {contribution.title}
              </Link>
              , we'll review it and get in touch with you very shortly!
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

      startTransition(() => {
        refreshApplication();
      });
      setApplying(false);
    } else {
      if (!isGithubRegistered || contribution === undefined || contributorId === undefined) {
        setDisplayRegisterModal(true);
        return;
      }
      const applyUrl = `${config.TYPEFORM_APPLY_URL}#${buildTypeformParams()}`;

      window.open(applyUrl, "_blank");
    }
  }, [contributionId, isGithubRegistered, userDiscordHandle]);

  const claim = useCallback(() => {
    console.log("Claim contribution", contributionId);
  }, [contributionId]);

  const submit = useCallback(() => {
    const submitUrl = `${config.TYPEFORM_SUBMIT_URL}#${buildTypeformParams()}`;

    window.open(submitUrl, "_blank");
  }, [contributionId, isGithubRegistered, userDiscordHandle]);

  if (!contribution) {
    return <NotFoundError />;
  }

  return (
    <ContributionDetailsPage
      contribution={contribution}
      apply={apply}
      claim={claim}
      submit={submit}
      appliying={appliying}
      accountAddress={account?.address}
      contributorId={contributorId}
      hasAppliedToContribution={hasAppliedToContribution}
    />
  );
};

export default ContributionDetailsPageContainer;
