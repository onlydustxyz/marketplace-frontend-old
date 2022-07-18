import { FC, ReactNode } from "react";

type Props = {
  renderIcon: () => ReactNode;
  label: string;
  value: string | undefined;
};

const MetadataItem: FC<Props> = ({ label, value, renderIcon }) => {
  return (
    <div className="h-[58px] flex flex-col justify-between">
      <div className="flex flex-row items-center justify-center">
        {renderIcon()}
        <span className="text-light-blue text-[11px] leading-[14px] uppercase">{label}</span>
      </div>
      <div className="text-[22px] leading-[27px] font-medium text-center capitalize">{value || "-"}</div>
    </div>
  );
};

export default MetadataItem;
