import { FC } from "react";
import Check from "src/icons/Check";

const CompletedBadge: FC = () => {
  return (
    <div className="rounded-full bg-[#1FA67D] h-[22px] w-[22px] flex items-center justify-center">
      <Check size={22} />
    </div>
  );
};

export default CompletedBadge;
