import { useParams } from "react-router-dom";
import useContribution from "src/hooks/useContributionMock";
import NotFoundError from "src/utils/errors/NotFoundError";

type ContributionDetailsPageParams = {
  contributionId: string;
};

export default function ContributionDetailsPage() {
  const { contributionId } = useParams<ContributionDetailsPageParams>();

  const { contribution, isLoading, error } = useContribution(contributionId);

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (error instanceof NotFoundError) {
    return <div>There is no contribution for this id</div>;
  }

  return (
    <div>
      <h2>Contribution detail : {contribution.title}</h2>
      <h3>Contribution info</h3>
      <ul>
        <li>Project: {contribution.project.title}</li>
        <li>Title: {contribution.title}</li>
        <li>Description: {contribution.description}</li>
      </ul>
      <h3>Project info</h3>
      <ul>
        <li>Project: {contribution.project.title}</li>
        <li>Description: {contribution.project.description}</li>
        <li>
          Github:
          <a href={contribution.project.githubLink} target="_blank">
            {contribution.project.githubLink}
          </a>
        </li>
      </ul>
    </div>
  );
}
