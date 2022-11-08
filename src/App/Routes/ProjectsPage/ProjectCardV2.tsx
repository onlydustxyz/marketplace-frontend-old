import { FC } from "react";

import logoPlaceholder from "src/assets/img/project-logo-placeholder.png";
import { ProjectWithAggregateContributions } from "src/state";

type ProjectCardProps = Pick<
  ProjectWithAggregateContributions,
  "id" | "title" | "alreadyGrantedAmount" | "logo" | "description"
>;

const ProjectCard: FC<ProjectCardProps> = ({ id, title, alreadyGrantedAmount, logo, description }) => {
  return (
    <div className={"relative flex flex-col items-center h-full hover:opacity-70"}>
      <div className="w-full flex-grow pt-6 flex flex-col items-center justify-start bg-gradient-to-br from-fuchsia-800/40 to-fuchsia-900/10 backdrop-blur-lg rounded-lg">
        <img className="rounded-full z-10 mb-3 w-16" src={logo || logoPlaceholder} />
        <h2
          className="font-alfreda font-bold text-4xl leading-[42px] text-center mt-2"
          data-testid={`project-card-${id}-title`}
        >
          {title}
        </h2>
        <div
          className="flex-grow my-5 mx-12 text-light-purple text-center text-opacity-85 leading-6"
          data-testid={`project-card-${id}-description`}
        >
          {description}
        </div>
        {alreadyGrantedAmount && (
          <div
            className="mb-3 bg-yellow-300/10 bg-opacity-20 w-11/12 text-center rounded-md py-2"
            data-testid={`project-card-${id}-available-contributions`}
          >
            <span className="text-yellow-400/40 text-md">Already granted : </span>
            <span className="text-yellow-200 text-l">{`${alreadyGrantedAmount} USDC`}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
