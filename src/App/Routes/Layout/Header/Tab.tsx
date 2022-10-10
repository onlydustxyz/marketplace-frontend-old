import { FC, PropsWithChildren } from "react";
import cn from "classnames";
import { NavLink } from "react-router-dom";

interface Props {
  to: string;
  dataTestId?: string;
  className?: string;
}

const HeaderTab: FC<PropsWithChildren<Props>> = ({ className, to, dataTestId, children }) => {
  return (
    <NavLink
      className={({ isActive }) =>
        cn(
          "h-full md:leading-[89px] inline-flex items-center",
          isActive ? "text-white md:border-b md:border-white fill-white" : "text-white/40 fill-white/40",
          className
        )
      }
      to={to}
      data-testid={dataTestId}
    >
      {children}
    </NavLink>
  );
};

export default HeaderTab;
