import { FC } from "react";
import { Project } from "src/model/contributions/repository";

type Props = {
  project?: Project;
};
const ProjectDetailsPage: FC<Props> = ({ project }) => {
  if (!project) {
    return null;
  }

  return (
    <div>
      <h2>Project details: {project.title}</h2>
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
    </div>
  );
};

export default ProjectDetailsPage;
