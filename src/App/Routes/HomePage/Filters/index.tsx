import { FC } from "react";
import cn from "classnames";

import ContextFilter from "./ContextFilter";
import DifficultyFilter from "./DifficultyFilter";
import DurationFilter from "./DurationFilter";
import ProjectFilter from "./ProjectFilter";
import StatusFilter from "./StatusFilter";
import TypeFilter from "./TypeFilter";
import TechnologyFilter from "./TechnologyFilter";

type Props = {
  className?: string;
};

const Filters: FC<Props> = ({ className }) => {
  return (
    <div className={cn("w-full grid grid-cols-[repeat(auto-fill,_minmax(180px,1fr))] gap-4", className)}>
      <StatusFilter />
      <DifficultyFilter />
      <TechnologyFilter />
      <ProjectFilter />
      <DurationFilter />
      <TypeFilter />
      <ContextFilter />
    </div>
  );
};

export default Filters;
