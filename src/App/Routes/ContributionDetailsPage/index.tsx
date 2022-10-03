import { Link, useParams } from "react-router-dom";
import { useRecoilRefresher_UNSTABLE, useRecoilValue_TRANSITION_SUPPORT_UNSTABLE, useSetRecoilState } from "recoil";
import ContributionDetailsPage from "./View";
import {
  accountAddressSelector,
  accountAtom,
  contributionQuery,
  contributorApplicationsQuery,
  displayRegisterModalAtom,
  isGithubRegisteredSelector,
  userContributorIdSelector,
  userDiscordHandleSelector,
  userGithubHandleSelector,
} from "src/state";
import { FC, startTransition, useCallback, useState } from "react";
import config from "src/config";
import { applicationRepository } from "src/model/applications/repository";
import { toastPromise, toastTransaction } from "src/lib/toast-promise";
import NotFoundError from "./NotFoundError";
import { useContract } from "@starknet-react/core";
import { Abi } from "starknet";

import contributionsAbi from "src/abis/contributions.json";
import { bnToUint256 } from "starknet/dist/utils/uint256";
import useRefreshContributions from "src/hooks/refresh-contributions";

type PageParams = {
  contributionId: string;
};
const ContributionDetailsPageContainer: FC = () => {
  const { contributionId } = useParams<PageParams>();
  const contribution = useRecoilValue_TRANSITION_SUPPORT_UNSTABLE(contributionQuery(contributionId));
  const contributorId = useRecoilValue_TRANSITION_SUPPORT_UNSTABLE(accountAddressSelector);
  const account = useRecoilValue_TRANSITION_SUPPORT_UNSTABLE(accountAtom);
  const isGithubRegistered = useRecoilValue_TRANSITION_SUPPORT_UNSTABLE(isGithubRegisteredSelector);
  const userGithubHandle = useRecoilValue_TRANSITION_SUPPORT_UNSTABLE(userGithubHandleSelector);
  const userDiscordHandle = useRecoilValue_TRANSITION_SUPPORT_UNSTABLE(userDiscordHandleSelector);
  const setDisplayRegisterModal = useSetRecoilState(displayRegisterModalAtom);
  const hasAppliedToContribution = !!contribution?.applied;

  const [appliying, setApplying] = useState(false);

  const refreshApplications = useRecoilRefresher_UNSTABLE(contributorApplicationsQuery);

  const { contract: contributionsContract } = useContract({
    abi: contributionsAbi as Abi,
    address: config.CONTRIBUTIONS_CONTRACT_ADDRESS,
  });

  const buildTypeformParams = useCallback(() => {
    const typeformParams = new URLSearchParams();
    account?.address && typeformParams.set("wallet", account.address);
    userGithubHandle && typeformParams.set("github", userGithubHandle);
    contribution?.github_link && typeformParams.set("githubissue", contribution.github_link);
    contributorId && typeformParams.set("contributorid", contributorId);
    if (contributionId) {
      typeformParams.set("contributionid", contributionId);
    }

    return typeformParams.toString();
  }, [contributionId]);

  const apply = useCallback(async () => {
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

    toastPromise(
      applicationRepository.create({ contributionId: contribution.id, contributorId: contributorId as ContributorId }),
      {
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
      }
    );

    startTransition(() => {
      refreshApplications();
    });
    setApplying(false);
  }, [contributionId, isGithubRegistered, userDiscordHandle]);

  const claim = useCallback(() => {
    if (
      !contributionsContract ||
      contribution === undefined ||
      contributorId === undefined ||
      account === undefined ||
      userDiscordHandle === undefined
    ) {
      setDisplayRegisterModal(true);
      return;
    }

    const contributorIdUint256 = bnToUint256(contributorId);
    toastTransaction(
      contributionsContract?.invoke("claim_contribution", [[contributionId], contributorIdUint256]),
      account,
      {
        success: () => {
          return (
            <div className="leading-[1rem] line-clamp-3">
              You are now assigned to the contribution{" "}
              <Link to={`/contributions/${contributionId}`} className="italic underline">
                {contribution.title}
              </Link>
              !
            </div>
          );
        },
        pending: () => "You are being assigned this contribution",
        error: () => (
          <>
            An error occured while claiming this contribution
            <br />
            Please try again
          </>
        ),
      }
    );
  }, [contributionId, contribution?.title]);

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
      contributorId={contributorId as ContributorId}
      hasAppliedToContribution={hasAppliedToContribution}
    />
  );
};

export default ContributionDetailsPageContainer;
