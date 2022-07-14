import { FC, ReactNode } from "react";
import cn from "classnames";

type Props = {
  renderIcon: () => ReactNode;
  label: string;
  value: string | undefined;
};

const MetadataItem: FC<Props> = ({ label, value, renderIcon }) => {
  const valueClassName = !value ? "text-white/25 italic" : "";

  return (
    <div className="h-[58px] flex flex-col justify-between">
      <div className="flex flex-row items-center justify-center">
        {renderIcon()}
        <span className="text-light-blue text-[11px] leading-[14px] uppercase">{label}</span>
      </div>
      <div className={cn("text-[22px] leading-[27px] font-bold text-center capitalize", valueClassName)}>
        {value || "unknown"}
      </div>
    </div>
  );
};

export default MetadataItem;
