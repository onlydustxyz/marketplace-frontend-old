import { FC } from "react";
import cn from "classnames";

import StatusFilter from "./StatusFilter";

type Props = {
  className?: string;
};

const Filters: FC<Props> = ({ className }) => {
  return (
    <div className={cn("w-full", className)}>
      <StatusFilter />
    </div>
  );
};

export default Filters;
