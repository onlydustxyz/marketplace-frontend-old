import { FC, PropsWithChildren } from "react";

type Props = {
  url: string;
  dataTestId?: string;
};

const Link: FC<PropsWithChildren<Props>> = ({ children, dataTestId, url }) => {
  return (
    <a
      href={url}
      target="_blank"
      className="group flex flex-row items-center justify-center border-2 border-light-purple w-[204px] h-[54px] hover:bg-light-purple"
      data-testid={dataTestId}
    >
      <div className="text-light-purple text-lg font-medium tracking-[1px] uppercase group-hover:text-black">
        {children}
      </div>
    </a>
  );
};

export default Link;
