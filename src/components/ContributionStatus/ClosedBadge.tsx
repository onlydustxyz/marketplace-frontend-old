import { FC } from "react";
import TinyCross from "src/icons/TinyCross";

const ClosedBadge: FC = () => {
  return (
    <div className="rounded-full bg-white h-[22px] w-[22px] flex items-center justify-center">
      <TinyCross size={14} />
    </div>
  );
};

export default ClosedBadge;
