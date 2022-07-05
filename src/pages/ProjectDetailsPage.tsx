import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { projectQuery } from "src/state";

type ProjectDetailsPageParams = {
  projectId: string;
};

export default function ProjectDetailsPage() {
  const { projectId } = useParams<ProjectDetailsPageParams>();
  const project = useRecoilValue(projectQuery(projectId));

  if (!project) {
    return null;
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
    </div>
  );
}
