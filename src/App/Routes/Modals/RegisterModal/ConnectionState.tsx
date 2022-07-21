import { FC } from "react";
import cn from "classnames";
import ConnectDot from "src/components/ConnectDot";

type Props = {
  accountLabel?: string;
  connected?: boolean;
  providerName: string;
};

const ConnectionState: FC<Props> = ({ accountLabel, connected = false, providerName }) => {
  const className = connected ? "bg-light-blue/5" : "bg-[#000226]/66";
  const accountClassName = connected ? "text-light-blue" : "text-white/50";

  return (
    <div className={cn("w-[196px] h-[108px] flex flex-col items-center bg-light-blue/5 text-base", className)}>
      <ConnectDot connected={connected} className="mt-[26px] mb-5" />
      <div className="leading-5">{providerName}</div>
      <div className={cn("leading-5", accountClassName)}>{connected ? accountLabel : "Not connected"}</div>
    </div>
  );
};

export default ConnectionState;
