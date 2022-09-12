import { FC, useState } from "react";
import { useRecoilValue_TRANSITION_SUPPORT_UNSTABLE } from "recoil";

import { filteredContributionsSelector } from "src/state/contributions-filters";

import ContributionsPage from "./View";

const ContributionsPageContainer: FC = () => {
  const contributions = useRecoilValue_TRANSITION_SUPPORT_UNSTABLE(filteredContributionsSelector);

  const [displayFilters, setDisplayFilters] = useState(false);

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
