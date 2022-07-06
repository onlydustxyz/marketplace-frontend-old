import { FC } from "react";
import { Link } from "react-router-dom";
import { Contribution } from "src/model/contributions/repository";

type Props = { contribution?: Contribution };

const ContributionDetailsPage: FC<Props> = ({ contribution }) => {
  if (!contribution) {
    return null;
  }

  return (
    <div>
      <h2>Contribution details: {contribution.title}</h2>
      <h3>Contribution info</h3>
      <ul>
        <li>
          Project:{" "}
          <Link
            to={{
              pathname: `/projects/${contribution.project.id}`,
            }}
          >
            {contribution.project.title}
          </Link>
        </li>
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
};

export default ContributionDetailsPage;
