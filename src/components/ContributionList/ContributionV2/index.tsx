import { FC } from "react";
import cn from "classnames";

import Difficulty from "src/icons/Difficulty";
import Technology from "src/icons/Technology";
import { ContributionWithStatus as ContributionType, ContributionStatusEnum } from "src/state";
import ContributionStatus from "../../ContributionStatus";
import Reward from "src/icons/Reward";

export type ContributionProps = Pick<ContributionType, "status" | "title" | "project">;

const Contribution: FC<ContributionProps> = ({ status, title, project }) => {
  const cardClassName =
    status === ContributionStatusEnum.OPEN ? "bg-black hover:opacity-70" : "bg-black opacity-60 hover:opacity-40";
  return (
    <div className={cn("group md:h-40 backdrop-blur shadow-2xl shadow-black px-4 md:px-8 py-3.5", cardClassName)}>
      <div className="h-full flex flex-col md:flex-row">
        <div className="grow flex flex-row flex-wrap md:flex-nowrap md:flex-col">
          <ContributionStatus
            status={status}
            className="mb-1.5 mt-0.5 order-1 md:order-none basis-6/12 md:basis-auto"
          />
          <div className="grow mt-1.5 order-3 md:order-none basis-full md:basis-auto">
            <div className="font-alfreda text-md md:text-2xl leading-6 md:leading-8 font-medium tracking-wide text-shadow-contribution-title line-clamp-2">
              {title} As a user I want to create symmetrical contributions with a mirror mode and maybe more one day
            </div>
          </div>
          <div className="flex flex-row items-center order-2 md:order-none grow justify-end md:justify-start scale-80 md:scale-100">
            {project.logo && <img height="28px" width="28px" src={project.logo} className="mr-2.5" />}
            <span
              className={cn(
                "text-white/80 font-normal text-sm basis-6/12 md:basis-auto line-clamp-1",
                !project.logo ? "md:ml-9.5" : undefined
              )}
            >
              {project.title}
            </span>
          </div>
        </div>
        <div className="flex flex-row mt-2 md:mt-0 md:flex-col gap-2 items-end text-3.5 md:text-4 flex-wrap md:flex-nowrap">
          <div className="h-8 md:h-10 bg-neutral-900 rounded-full flex flex-row items-center px-3.5 whitespace-nowrap">
            <Technology size={18} className="fill-white mr-2.5" /> Cairo
          </div>
          <div className="h-8 md:h-10 bg-neutral-900 rounded-full flex flex-row items-center px-3.5 text-blue-300 text-shadow-contribution-difficulty shadow-contribution-difficulty whitespace-nowrap">
            <Difficulty size={18} className="fill-blue-300 mr-2.5" /> Medium
          </div>
          <div className="h-8 md:h-10 bg-neutral-900 rounded-full flex flex-row items-center px-3.5 text-sm text-amber-200 tracking-[0.66px] whitespace-nowrap">
            <Reward size={18} className="fill-white mr-2.5" /> 500 - 750 USDC
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contribution;
