import { FC } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import "github-markdown-css/github-markdown-dark.css";

import BackButton from "src/components/BackButton";
import { ContributionStatusEnum } from "src/model/projects/repository";
import { Contribution } from "src/state";
import logoPlaceholder from "src/assets/img/project-logo-placeholder.png";
import Button from "src/components/Button";
import StatusHeader from "./StatusHeader";
import MetadataList from "./MetadataList";
import Loader from "src/icons/Loader";
import cn from "classnames";

type Props = {
  apply: () => void;
  claim: () => void;
  submit: () => void;
  appliying: boolean;
  accountAddress?: string;
  contribution: Contribution;
  contributorId?: number;
  hasAppliedToContribution: boolean;
};

const ContributionDetailsPage: FC<Props> = ({
  apply,
  claim,
  submit,
  appliying,
  accountAddress,
  contribution,
  contributorId,
  hasAppliedToContribution = false,
}) => {
  const actionButtons = renderActionButton();
  const hasActions = !!actionButtons;

  return (
    <div className="relative mt-2 md:mt-10 px-4 md:px-8 flex flex-col items-center max-w-screen-2xl w-full">
      <div className="flex flex-col md:flex-row max-w-[1410px] w-full justify-start">
        <BackButton />

        <div className="relative flex flex-grow flex-col items-center mt-2 md:mt-0 md:px-12 max-w-screen-xl w-full">
          <StatusHeader contribution={contribution} hasAppliedToContribution={hasAppliedToContribution} />
        </div>
      </div>
      <div className="relative flex flex-col items-center px-0 md:px-12 max-w-screen-xl w-screen">
        <a href={contribution.github_link} target="_blank">
          <div className="mt-4 md:mt-8 mx-4 md:mx-12 font-alfreda text-3xl md:text-[52px] md:leading-[68px] capitalize text-center line-clamp-3 md:line-clamp-none">
            {contribution.title}
          </div>
        </a>
        <div className="mt-4 md:mt-8 flex flex-col items-center">
          <Link to={`/projects/${contribution.project.id}`}>
            <img className="rounded-full" src={contribution.project.logo || logoPlaceholder} width={54} />
          </Link>
          <span className="mt-5 text-light-purple/66 text-xs uppercase">Proposed by</span>
          <Link
            className="mt-2 font-medium text-white text-[28px] leading-[34px] capitalize"
            to={`/projects/${contribution.project.id}`}
          >
            {contribution.project.title}
          </Link>
        </div>
        <MetadataList contribution={contribution} className="mt-4 md:mt-10 w-full" />
      </div>

      <div
        className={cn(
          "-mx-4 flex flex-col items-center max-w-screen-xl md:px-20 w-screen shadow-contribution-description",
          hasActions ? "mb-24 md:mb-32" : ""
        )}
      >
        <div className="py-4 px-4 md:p-20 bg-mid-blue/30 backdrop-blur-[7px] w-full text-[64px] md:text-base">
          <ReactMarkdown
            linkTarget="_blank"
            className="markdown-body text-[64px]"
            children={contribution.description}
          />
        </div>
      </div>
      {actionButtons && (
        <div className="fixed bottom-0 w-full py-4 md:pt-[48px] md:py-0 md:h-[158px] flex flex-col items-center justify-stretch bg-contribution-apply-gradient">
          {actionButtons}
        </div>
      )}
    </div>
  );

  function renderActionButton() {
    if (appliying) {
      return (
        <Button onClick={apply} disabled role="button">
          Applying
          <Loader className="animate-spin ml-4" />
        </Button>
      );
    }
    if (
      contribution?.status === ContributionStatusEnum.ASSIGNED &&
      parseInt(contribution.metadata.assignee, 16) === contributorId
    ) {
      return (
        <Button onClick={submit} role="button">
          Submit work
        </Button>
      );
    }

    if (ContributionStatusEnum.OPEN === contribution.status) {
      if (hasAppliedToContribution) {
        return (
          <Button onClick={apply} disabled={true} role="button">
            Applied
          </Button>
        );
      }

      if (
        accountAddress !== undefined &&
        contribution.project.members.some(
          member => parseInt(member.contributor_account, 16) === parseInt(accountAddress, 16)
        )
      ) {
        return (
          <Button onClick={claim} disabled={contribution.eligible === false} role="button">
            Claim
          </Button>
        );
      }

      return (
        <Button onClick={apply} disabled={contribution.eligible === false} role="button">
          Apply
        </Button>
      );
    }

    return null;
  }
};

export default ContributionDetailsPage;
