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
        "group flex flex-row items-center justify-center p-2 md:p-[21px] h-[36px] min-w-[36px] w-[36px] md:h-[66px] md:min-w-[66px] md:w-[66px] bg-[#0038FF]/10 backdrop-blur-[6px] text-light-purple/40 cursor-pointer hover:bg-[#0038FF]/20"
      )}
      onClick={onClick}
    >
      <Arrow className="rotate-180 fill-light-purple/40 group-hover:fill-light-purple/60" size="100%" />
    </div>
  );
};

export default BackButton;
