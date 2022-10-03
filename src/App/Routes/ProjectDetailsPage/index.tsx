import { FC } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue_TRANSITION_SUPPORT_UNSTABLE } from "recoil";
import ProjectDetailsPage from "./View";
import { projectContributionsQuery, projectQuery } from "src/state";
import useRefreshContributions from "src/hooks/refresh-contributions";

type PageParams = {
  projectId: string;
};

const ProjectDetailsPageContainer: FC = () => {
  const { projectId } = useParams<PageParams>();
  const project = useRecoilValue_TRANSITION_SUPPORT_UNSTABLE(projectQuery(projectId));
  const projectContribution = useRecoilValue_TRANSITION_SUPPORT_UNSTABLE(projectContributionsQuery(projectId));

  useRefreshContributions();

  return <ProjectDetailsPage project={project} contributions={projectContribution} />;
};

export default ProjectDetailsPageContainer;
