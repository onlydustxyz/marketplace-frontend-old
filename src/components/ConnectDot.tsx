import { FC } from "react";
import cn from "classnames";

interface Props {
  className?: string;
  connected: boolean;
  dataTestId?: string;
}

const ConnectDot: FC<Props> = ({ className, connected, dataTestId }) => {
  const dotClassName = connected ? "bg-light-blue shadow-dot-connected" : "bg-black shadow-dot-not-connected";

  return <div className={cn("h-[5px] w-[5px] rounded-full", dotClassName, className)} data-testid={dataTestId}></div>;
};

export default ConnectDot;
