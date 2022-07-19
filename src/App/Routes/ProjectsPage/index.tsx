import { FC } from "react";
import { useRecoilValue_TRANSITION_SUPPORT_UNSTABLE } from "recoil";
import { projectsQuery } from "src/state";
import ProjectsPage from "./View";

const ProjectsPageContainer: FC = () => {
  const projects = useRecoilValue_TRANSITION_SUPPORT_UNSTABLE(projectsQuery);

  return <ProjectsPage projects={projects} />;
};

export default ProjectsPageContainer;
