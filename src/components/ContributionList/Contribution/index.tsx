import { FC } from "react";
import { Link } from "react-router-dom";
import Difficulty from "src/icons/Difficulty";
import Star from "src/icons/Star";
import Technology from "src/icons/Technology";
import { Contribution as ContributionType } from "src/model/contributions/repository";
import ContributionStatus from "./Status";

type Props = ContributionType;

const Contribution: FC<Props> = contribution => {
  return (
    <Link to={`/contributions/${contribution.id}`} className="flex-1">
      <div className="group flex flex-col w-[368px] h-[424px] bg-mid-blue/30 backdrop-blur-[2px] shadow-2xl shadow-black hover:bg-mid-blue/40 hover:translate-y-[-14px] hover:rotate-[-1deg]">
        <div className="h-[72px] grid grid-cols-2 items-center text-xs uppercase mx-8">
          <ContributionStatus status={contribution.status} />
          <div className="flex flex-row items-center justify-end">
            <div className="text-gold mr-2">50 USDC</div>
            <Star size={17} />
          </div>
        </div>
        <h2 className="grow font-alfreda text-3xl leading-[42px] text-center px-8">{contribution.title}</h2>

        <div className="flex flex-col items-center mb-4">
          <span className="text-light-purple/70 uppercase text-[10px] tracking-widest	">Project</span>
          <span>{contribution.project.title}</span>
        </div>
        <div className="relative h-[80px] grid grid-cols-2 items-center text-center text-xl bg-mid-blue/20 group-hover:bg-mid-blue/40">
          <div className="flex flex-col items-center">
            <Difficulty size={18} className="fill-light-blue" />
            <div className="capitalize mt-2.5 font-bold">{contribution.metadata.difficulty}</div>
          </div>
          <div className="flex flex-col items-center">
            <Technology size={18} className="fill-light-blue" />
            <div className="capitalize mt-2.5 font-bold ">{contribution.metadata.technology}</div>
          </div>
          {renderDivider()}
        </div>
      </div>
    </Link>
  );

  function renderDivider() {
    return (
      <svg
        width="2"
        height="44"
        viewBox="0 0 2 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute left-[50%]"
      >
        <path d="M1 0L1 44" stroke="#EBDDFF" strokeOpacity="0.33" strokeLinejoin="round" strokeDasharray="1 4" />
      </svg>
    );
  }
};

export default Contribution;
