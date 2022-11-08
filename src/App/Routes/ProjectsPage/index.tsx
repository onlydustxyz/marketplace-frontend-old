import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue_TRANSITION_SUPPORT_UNSTABLE } from "recoil";

import { displayedProjectListSelector } from "src/state";
import { useNewUI } from "src/utils/version";
import ProjectCard from "./ProjectCard";
import ProjectCardV2 from "./ProjectCardV2";

import ProjectsPage from "./View";
import ProjectsPageV2 from "./ViewV2";

const ProjectsPageContainer: FC = () => {
  const projects = useRecoilValue_TRANSITION_SUPPORT_UNSTABLE(displayedProjectListSelector);
  const newUI = useNewUI();

  const [displayFilters, setDisplayFilters] = useState(false);

  const toggleFilters = () => {
    setDisplayFilters(displayFilters => !displayFilters);
  };

  const closeFilters = () => {
    setDisplayFilters(false);
  };

  return (
    <>
      {newUI && (
        <ProjectsPageV2 toggleFilters={toggleFilters} displayFilters={displayFilters} closeFilters={closeFilters}>
          {projects.map(project => (
            <li key={project.id} data-testid={`project-link-${project.id}`}>
              <Link to={`/projects/${project.id}`}>
                <ProjectCardV2 {...{ ...project, alreadyGrantedAmount: 3000 }} />
              </Link>
            </li>
          ))}
        </ProjectsPageV2>
      )}
      {!newUI && (
        <ProjectsPage toggleFilters={toggleFilters} displayFilters={displayFilters} closeFilters={closeFilters}>
          {projects.map(project => (
            <li key={project.id} data-testid={`project-link-${project.id}`}>
              <Link to={`/projects/${project.id}`}>
                <ProjectCard className="h-full" project={project} />
              </Link>
            </li>
          ))}
        </ProjectsPage>
      )}
    </>
  );
};

export default ProjectsPageContainer;
