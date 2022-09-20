import { FC } from "react";
import cn from "classnames";
import ConnectDot from "src/components/ConnectDot";

type Props = {
  accountLabel?: string;
  connected?: boolean;
  providerName: string;
  dataTestid?: string;
};

const ConnectionState: FC<Props> = ({ accountLabel, connected = false, dataTestid, providerName }) => {
  const className = connected ? "bg-light-blue/5" : "bg-[#000226]/66";
  const accountClassName = connected ? "text-light-blue" : "text-white/50";

  return (
    <div
      className={cn(
        "w-full md:w-[196px] md:h-[108px] bg-light-blue/5 text-base",
        "grid grid-cols-[24px_1fr] md:grid-cols-[1fr] md:justify-items-center py-2 md:py-4 items-center",
        className
      )}
      data-testid={dataTestid}
    >
      <div className="row-span-2 px-6 md:px-0 md:pt-2.5 md:pb-5">
        <ConnectDot connected={connected} />
      </div>
      <div className="leading-5 flex-grow w-full">{providerName}</div>

      <div className={cn("leading-5", accountClassName)}>{connected ? accountLabel : "Not connected"}</div>
    </div>
  );
};

export default ConnectionState;
