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
    <div
      className={cn(
        "group md:h-[165px] backdrop-blur-[7px] shadow-2xl shadow-black px-[16px] md:px-[30px] py-[14px]",
        cardClassName
      )}
    >
      <div className="h-full flex flex-col md:flex-row">
        <div className="grow flex flex-row flex-wrap md:flex-nowrap md:flex-col">
          <ContributionStatus
            status={status}
            className="mb-1.5 mt-0.5 order-1 md:order-none basis-6/12 md:basis-auto"
          />
          <div className="grow mt-[6px] order-3 md:order-none basis-full md:basis-auto">
            <div className="font-alfreda text-[20px] md:text-[28px] leading-[24px] md:leading-[32px] font-medium tracking-[0.4px] text-shadow-contribution-title line-clamp-2">
              {title} As a user I want to create symmetrical contributions with a mirror mode and maybe more one day
            </div>
          </div>
          <div className="flex flex-row items-center order-2 md:order-none grow justify-end md:justify-start scale-80 md:scale-100">
            {project.logo && <img height="28px" width="28px" src={project.logo} className="mr-[10px]" />}
            <span
              className={cn(
                "text-white/80 font-normal text-[14px] basis-6/12 md:basis-auto line-clamp-1",
                !project.logo ? "md:ml-[38px]" : undefined
              )}
            >
              {project.title}
            </span>
          </div>
        </div>
        <div className="flex flex-row mt-2 md:mt-0 md:flex-col gap-[7px] items-end text-[14px] md:text-[16px] flex-wrap md:flex-nowrap">
          <div className="h-[32px] md:h-[41px] bg-[#141414] rounded-full flex flex-row items-center px-[14px] whitespace-nowrap">
            <Technology size={18} className="fill-white mr-[11px]" /> Cairo
          </div>
          <div className="h-[32px] md:h-[41px] bg-[#141414] rounded-full flex flex-row items-center px-[14px] text-[#94B8FF] text-shadow-contribution-difficulty shadow-contribution-difficulty whitespace-nowrap">
            <Difficulty size={18} className="fill-[#4273F2] mr-[11px]" /> Medium
          </div>
          <div className="h-[32px] md:h-[41px] bg-[#141414] rounded-full flex flex-row items-center px-[14px] text-[13px] text-[#FADF9B] tracking-[0.66px] whitespace-nowrap">
            <Reward size={18} className="fill-white mr-[11px]" /> 500 - 750 USDC
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contribution;
