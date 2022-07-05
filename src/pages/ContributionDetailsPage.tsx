import { useParams } from "react-router-dom";
import useContribution from "src/hooks/useContributionMock";
import useProject from "src/hooks/useProjectMock";
import NotFoundError from "src/utils/errors/NotFoundError";

type ContributionDetailsPageParams = {
  contributionId: string;
};

export default function ContributionDetailsPage() {
  const { contributionId } = useParams<ContributionDetailsPageParams>();

  const { contribution, isLoading: isContributionLoading, error: contributionError } = useContribution(contributionId);
  const { project, isLoading: isProjectLoading, error: projectError } = useProject(contribution?.projectId);

  if (isContributionLoading || isProjectLoading) {
    return <div>Loading</div>;
  }

  if (contributionError instanceof NotFoundError) {
    return <div>There is no contribution for this id</div>;
  }

  if (!contribution || !project) {
    return <div></div>;
  }

  return (
    <div>
      <h2>Contribution detail : {project.title}</h2>
      <h3>Project info</h3>
      <ul>
        <li>Project: {project.title}</li>
        <li>Description: {project.description}</li>
        <li>
          Github:
          <a href={project.githubLink} target="_blank">
            {project.githubLink}
          </a>
        </li>
      </ul>
      <h3>Contribution info</h3>
      <ul>
        <li>Project: {project.title}</li>
        <li>Title: {contribution.title}</li>
        <li>Description: {contribution.description}</li>
        <li>Status: {contribution.status}</li>
      </ul>
    </div>
  );
}
