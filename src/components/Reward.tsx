import { FC } from "react";
import Star from "src/icons/Star";

type Props = {
  token: string;
  value: number;
  iconLeft?: boolean;
};

const Reward: FC<Props> = ({ iconLeft = false, token, value }) => {
  return (
    <div className="flex flex-row items-center justify-end">
      {iconLeft && <Star className="mr-2" size={17} />}
      <div className="text-gold text-[11px] leading-[14px]">
        {value.toString(10)} {token}
      </div>
      {!iconLeft && <Star className="ml-2" size={17} />}
    </div>
  );
};

export default Reward;
