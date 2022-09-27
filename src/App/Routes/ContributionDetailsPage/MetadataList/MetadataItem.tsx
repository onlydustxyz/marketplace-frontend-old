import { FC, ReactNode } from "react";

type Props = {
  renderIcon: () => ReactNode;
  label: string;
  value: string | undefined;
  valueDataTestId?: string;
};

const MetadataItem: FC<Props> = ({ label, value, renderIcon, valueDataTestId }) => {
  return (
    <div className="px-6 py-0.5 md:px-0 md:py-0 md:h-[58px] flex md:flex-col items-center justify-between gap-5">
      <div className="flex flex-row items-center justify-center">
        {renderIcon()}
        <span className="text-light-blue text-xs uppercase">{label}</span>
      </div>
      <div
        className="text-md md:text-[22px] md:leading-[27px] md:font-medium text-center capitalize"
        data-testid={valueDataTestId}
      >
        {value || "-"}
      </div>
    </div>
  );
};

export default MetadataItem;
