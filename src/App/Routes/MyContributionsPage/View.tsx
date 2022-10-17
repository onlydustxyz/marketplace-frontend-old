import { FC } from "react";

import Button from "src/components/Button";
import ContributionList from "src/components/ContributionList";
import { ContributionWithStatus } from "src/state";

interface Props {
  contributions: ContributionWithStatus[];
}

const MyContributionsPage: FC<Props> = ({ contributions }) => {
  if (contributions.length === 0) {
    return (
      <div className="mt-32 flex flex-col items-center">
        <div className="text-3xl text-light-blue/50 text-center">You don't have contributions yet</div>
        <Button className="mt-8" href="/" dataTestid="my-contributions-empty-button">
          Start contributing
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-screen-2xl px-8">
      <h1 className="mt-10 text-3xl font-alfreda" data-testid="page-main-title">
        My contributions
      </h1>

      <ContributionList className="mt-16" contributions={contributions} dataTestId="my-contributions-list" />
    </div>
  );
};

export default MyContributionsPage;
