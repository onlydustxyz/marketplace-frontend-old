import { FC, useState } from "react";
import { useRecoilValue_TRANSITION_SUPPORT_UNSTABLE } from "recoil";

import { filteredProjectsSelector } from "src/state";

import ProjectsPage from "./View";

const ProjectsPageContainer: FC = () => {
  const projects = useRecoilValue_TRANSITION_SUPPORT_UNSTABLE(filteredProjectsSelector);
  const [displayFilters, setDisplayFilters] = useState(false);

  const toggleFilters = () => {
    setDisplayFilters(displayFilters => !displayFilters);
  };

  const closeFilters = () => {
    setDisplayFilters(false);
  };

  return (
    <ProjectsPage
      projects={projects}
      toggleFilters={toggleFilters}
      displayFilters={displayFilters}
      closeFilters={closeFilters}
    />
  );
};

export default ProjectsPageContainer;
