import { FC } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import ProjectDetailsPage from "./View";
import { projectContributionsQuery, projectQuery } from "src/state";

type PageParams = {
  projectId: string;
};

const ProjectDetailsPageContainer: FC = () => {
  const { projectId } = useParams<PageParams>();
  const project = useRecoilValue(projectQuery(projectId));
  const projectContribution = useRecoilValue(projectContributionsQuery(projectId));

  return <ProjectDetailsPage project={project} contributions={projectContribution} />;
};

export default ProjectDetailsPageContainer;
