import { FC } from "react";
import cn from "classnames";

import ContextFilter from "./ContextFilter";
import DifficultyFilter from "./DifficultyFilter";
import DurationFilter from "./DurationFilter";
import ProjectFilter from "./ProjectFilter";
import StatusFilter from "./StatusFilter";
import TypeFilter from "./TypeFilter";
import TechnologyFilter from "./TechnologyFilter";

export type FilterProps = {
  className?: string;
  closeFilters: () => void;
  sourceKey: "contributions" | "projects";
};

const Filters: FC<FilterProps> = ({ className, closeFilters, sourceKey }) => {
  return (
    <div
      className={cn(
        "w-full grid grid-cols-[repeat(auto-fit,_minmax(160px,1fr))] gap-1 md:gap-4 justify-center",
        className
      )}
    >
      <StatusFilter sourceKey={sourceKey} />
      <DifficultyFilter sourceKey={sourceKey} />
      <TechnologyFilter sourceKey={sourceKey} />
      {sourceKey !== "projects" && <ProjectFilter sourceKey={sourceKey} />}
      <DurationFilter sourceKey={sourceKey} />
      <TypeFilter sourceKey={sourceKey} />
      <ContextFilter sourceKey={sourceKey} />
      <div className="md:hidden text-light-purple/50 mt-2 text-center" onClick={closeFilters}>
        Close filter panel
      </div>
    </div>
  );
};

export default Filters;
