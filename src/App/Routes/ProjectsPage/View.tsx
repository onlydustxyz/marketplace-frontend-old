import cn from "classnames";
import { FC } from "react";
import { Link } from "react-router-dom";
import Filters from "src/components/Filters";
import FilterIcon from "src/icons/Filter";
import { Project } from "src/state";

import ProjectCard from "./ProjectCard";

type Props = {
  projects: Project[];
  toggleFilters: () => void;
  displayFilters: boolean;
};

const ProjectsPage: FC<Props> = ({ displayFilters, projects, toggleFilters }) => {
  return (
    <div className="w-full max-w-screen-2xl px-8">
      <div className="relative flex flex-row mt-10 mb-4">
        <h1 className="flex-grow text-3xl font-alfreda leading-[63px]">All projects</h1>

        <div
          className={cn(
            "w-[63px] h-[63px] flex items-center justify-center cursor-pointer transition-all duration-300",
            displayFilters ? "bg-white" : "bg-black"
          )}
          onClick={toggleFilters}
        >
          <FilterIcon
            size={24}
            className={cn("transition-all duration-300", displayFilters ? "fill-black" : "fill-white")}
          />
        </div>
      </div>
      <Filters className={cn("mt-5", !displayFilters && "hidden")} sourceKey="projects" />
      <ul
        className="w-full mt-12 grid grid-cols-[repeat(auto-fill,_minmax(360px,1fr))] gap-x-[2%] gap-y-12 justify-between grid-rows-1"
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
