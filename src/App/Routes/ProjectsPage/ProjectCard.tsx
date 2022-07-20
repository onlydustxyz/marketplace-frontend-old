import { FC } from "react";
import cn from "classnames";

import { Project } from "src/model/contributions/repository";
import logoPlaceholder from "src/assets/img/project-logo-placeholder.png";

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
        <div className="mt-6 mb-8 text-light-blue text-center text-xs uppercase">
          {project.openedContributionsAmount} available contributions
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
