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

  return (
    <ContributionsPage contributions={contributions} displayFilters={displayFilters} toggleFilters={toggleFilters} />
  );
};

export default ContributionsPageContainer;
