import { FC } from "react";
import { useRecoilValue } from "recoil";
import { projectsQuery } from "src/state";
import ProjectsPage from "./View";

const ProjectsPageContainer: FC = () => {
  const projects = useRecoilValue(projectsQuery);

  return <ProjectsPage projects={projects} />;
};

export default ProjectsPageContainer;
