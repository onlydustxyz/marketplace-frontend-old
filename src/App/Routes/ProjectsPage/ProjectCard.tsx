import { FC } from "react";
import cn from "classnames";

import logoPlaceholder from "src/assets/img/project-logo-placeholder.png";
import { Project } from "src/state";
import TechnologyIcon from "src/icons/Technology";

type Props = {
  className?: string;
  project: Project;
};

const ProjectCard: FC<Props> = ({ className, project }) => {
  return (
    <div className={cn("relative flex flex-col items-center", className)}>
      <img className="absolute top-0 rounded-full z-10" src={project.logo || logoPlaceholder} width={93} />
      <div className="flex-grow mt-[46px] pt-[66px] w-full flex flex-col items-center justify-start bg-mid-blue/30 backdrop-blur-[7px]">
        <h2 className="font-alfreda font-bold text-3xl leading-[42px] text-center">{project.title}</h2>
        <div className="flex-grow mt-6 mx-12 text-light-purple leading-6">{project.description}</div>
        {renderProjects()}
        <div className="mt-6 mb-8 text-light-blue text-center text-xs uppercase">
          {project.openedContributionsAmount} available contributions
        </div>
      </div>
    </div>
  );

  function renderProjects() {
    if (project.technologies.length === 0) {
      return null;
    }

    return (
      <div className="flex items-center justify-center mt-4 px-8 w-full overflow-hidden ">
        <TechnologyIcon className="fill-light-blue mr-2 min-w-[20px]" size={20} />
        <div className="flex flex-row gap-2 line-clamp-1 text-xl">{project.technologies.join(", ")}</div>
      </div>
    );
  }
};

export default ProjectCard;
