import { FC } from "react";
import { Link } from "react-router-dom";
import { Project } from "src/state";

import ProjectCard from "./ProjectCard";

type Props = {
  projects: Project[];
};

const ProjectsPage: FC<Props> = ({ projects }) => {
  return (
    <div className="w-full max-w-screen-2xl px-8">
      <h1 className="mt-10 text-3xl font-alfreda">All projects</h1>
      <ul
        className="w-full grid grid-cols-[repeat(auto-fill,_minmax(360px,1fr))] gap-x-[2%]  gap-y-12 justify-between grid-rows-1"
        data-testid="project-list"
      >
        {projects.map(project => (
          <li key={project.id}>
            <Link to={`/projects/${project.id}`}>
              <ProjectCard className="h-full" project={project} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectsPage;
