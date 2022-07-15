import { FC } from "react";

const OpenBadge: FC = () => {
  return (
    <div className="flex items-center justify-center h-[17px] w-[17px] rounded-full bg-[#36DA95] shadow-assigned-badge-1">
      <div className="flex items-center justify-center h-[11px] w-[11px] rounded-full bg-[#3BF2A5] shadow-assigned-badge-2">
        <div className="rounded-full h-[5px] w-[5px] bg-[#86FFCC] shadow-assigned-badge-3"></div>
      </div>
    </div>
  );
};

export default OpenBadge;
