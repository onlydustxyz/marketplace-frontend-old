import { FC } from "react";
import cn from "classnames";
import Arrow from "src/icons/Arrow";

type Props = {
  className?: string;
  onClick: () => void;
};

const BackButton: FC<Props> = ({ className, onClick }) => {
  return (
    <div
      className={cn(
        className,
        "group flex flex-row items-center justify-center h-[66px] w-[66px] bg-black text-light-purple/40 cursor-pointer hover:bg-black/50"
      )}
      onClick={onClick}
    >
      <Arrow className="rotate-180 fill-light-purple/40 group-hover:fill-light-purple/60" />
    </div>
  );
};

export default BackButton;
