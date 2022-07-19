import { FC } from "react";
import cn from "classnames";

type Props = {
  accountLabel?: string;
  connected?: boolean;
  providerName: string;
};

const ConnectionState: FC<Props> = ({ accountLabel, connected = false, providerName }) => {
  const className = connected ? "bg-light-blue/5" : "bg-[#000226]/66";
  const dotClassName = connected ? "bg-light-blue shadow-dot-connected" : "bg-black shadow-dot-not-connected";
  const accountClassName = connected ? "text-light-blue" : "text-white/50";

  return (
    <div className={cn("w-[196px] h-[108px] flex flex-col items-center bg-light-blue/5 text-base", className)}>
      <div className={cn("mt-[26px] h-[5px] w-[5px] rounded-full mb-5", dotClassName)}></div>
      <div className="leading-5">{providerName}</div>
      <div className={cn("leading-5", accountClassName)}>{connected ? accountLabel : "Not connected"}</div>
    </div>
  );
};

export default ConnectionState;
