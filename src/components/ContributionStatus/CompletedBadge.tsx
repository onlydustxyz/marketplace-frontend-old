import { FC } from "react";
import Check from "src/icons/Check";

const CompletedBadge: FC = () => {
  return (
    <div className="rounded-full bg-green h-[22px] w-[22px] flex items-center justify-center">
      <Check size={22} />
    </div>
  );
};

export default CompletedBadge;
