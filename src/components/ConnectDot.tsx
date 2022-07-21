import { FC } from "react";
import cn from "classnames";

interface Props {
  className?: string;
  connected: boolean;
}

const ConnectDot: FC<Props> = ({ className, connected }) => {
  const dotClassName = connected ? "bg-light-blue shadow-dot-connected" : "bg-black shadow-dot-not-connected";

  return <div className={cn("h-[5px] w-[5px] rounded-full", dotClassName, className)}></div>;
};

export default ConnectDot;
