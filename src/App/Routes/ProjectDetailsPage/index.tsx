import { FC } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import ProjectDetailsPage from "./View";
import { projectQuery } from "src/state";

type PageParams = {
  projectId: string;
};

const ProjectDetailsPageContainer: FC = () => {
  const { projectId } = useParams<PageParams>();
  const project = useRecoilValue(projectQuery(projectId));

  return <ProjectDetailsPage project={project} />;
};

export default ProjectDetailsPageContainer;
