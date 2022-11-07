import { FC } from "react";
import cn from "classnames";

import Difficulty from "src/icons/Difficulty";
import Technology from "src/icons/Technology";
import { ContributionWithStatus as ContributionType, ContributionStatusEnum } from "src/state";
import Reward from "src/icons/Reward";
import { ContributionProperty, ContributionPropertyColor } from "./ContributionProperty";

export type ContributionProps = Pick<ContributionType, "status" | "title" | "project">;

const Contribution: FC<ContributionProps> = ({ status, title, project }) => {
  const cardClassName =
    status === ContributionStatusEnum.OPEN ? "bg-black hover:opacity-70" : "bg-black opacity-60 hover:opacity-40";
  return (
    <div className={cn("group md:h-40 backdrop-blur shadow-2xl shadow-black px-4 md:px-8 py-3.5", cardClassName)}>
      <div className="h-full flex flex-col md:flex-row">
        <div className="flex flex-row flex-wrap md:flex-nowrap md:flex-col">
          <div className="grow mt-1.5 order-3 md:order-none basis-full md:basis-auto md:w-11/12">
            <div className="font-alfreda text-md md:text-2xl md:leading-8 leading-6 font-medium tracking-wide text-shadow-contribution-title line-clamp-2">
              {title} As a user I want to create symmetrical contributions with a mirror mode and maybe more one day
            </div>
          </div>
          <div className="flex flex-row gap-2">
            <ContributionProperty text={project.title} textColor={ContributionPropertyColor.Gray}>
              {project.logo && <img height="28px" width="28px" src={project.logo} className="mr-2.5" />}
            </ContributionProperty>
            <ContributionProperty text="500 - 750 USDC" textColor={ContributionPropertyColor.Yellow}>
              <Reward size={18} className="fill-white mr-2.5" />
            </ContributionProperty>
          </div>
        </div>
        <div className="flex flex-row mt-2 md:mt-0 md:flex-col gap-2 md:justify-center justify-start items-end text-3.5 md:text-4 flex-wrap md:flex-nowrap">
          <ContributionProperty text="Cairo" textColor={ContributionPropertyColor.White}>
            <Technology size={18} className="fill-white mr-2.5" />
          </ContributionProperty>
          <ContributionProperty text="Medium" textColor={ContributionPropertyColor.Blue}>
            <Difficulty size={18} className="fill-blue-300 mr-2.5" />
          </ContributionProperty>
        </div>
      </div>
    </div>
  );
};

export default Contribution;
