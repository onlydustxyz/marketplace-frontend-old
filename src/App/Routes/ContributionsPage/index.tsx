import { FC, useState } from "react";
import { useRecoilValue_TRANSITION_SUPPORT_UNSTABLE } from "recoil";

import useRefreshContributions from "src/hooks/refresh-contributions";
import { filteredContributionsSelector } from "src/state";

import ContributionsPage from "./View";

const ContributionsPageContainer: FC = () => {
  const contributions = useRecoilValue_TRANSITION_SUPPORT_UNSTABLE(filteredContributionsSelector);

  const [displayFilters, setDisplayFilters] = useState(false);

  useRefreshContributions();

  const toggleFilters = () => {
    setDisplayFilters(displayFilters => !displayFilters);
  };

  const closeFilters = () => {
    setDisplayFilters(false);
  };

  return (
    <ContributionsPage
      contributions={contributions}
      displayFilters={displayFilters}
      toggleFilters={toggleFilters}
      closeFilters={closeFilters}
    />
  );
};

export default ContributionsPageContainer;
