import { FC } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue_TRANSITION_SUPPORT_UNSTABLE } from "recoil";
import ProjectDetailsPage from "./View";
import { projectContributionsState, projectQuery } from "src/state";
import useRefreshContributions from "src/hooks/refresh-contributions";

type PageParams = {
  projectId: string;
};

const ProjectDetailsPageContainer: FC = () => {
  const { projectId } = useParams<PageParams>();
  const project = useRecoilValue_TRANSITION_SUPPORT_UNSTABLE(projectQuery(projectId));
  const projectContributions = useRecoilValue_TRANSITION_SUPPORT_UNSTABLE(projectContributionsState(projectId));

  useRefreshContributions();

  return <ProjectDetailsPage project={project} contributions={projectContributions} />;
};

export default ProjectDetailsPageContainer;
