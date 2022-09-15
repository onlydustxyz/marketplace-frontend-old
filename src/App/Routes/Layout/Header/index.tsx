import cn from "classnames";
import { FC, Suspense, useCallback, useState } from "react";
import { Link, NavLink } from "react-router-dom";

import logo from "src/assets/img/onlydust-logo.png";
import BurgerMenuIcon from "src/icons/BurgerMenu";
import ProfileHeader from "./ProfileHeader";

const Header: FC = () => {
  const [openedMenu, setOpenedMenu] = useState(false);

  const toggleOpenedMenu = useCallback(() => {
    setOpenedMenu(currentOpenedMenu => !currentOpenedMenu);
  }, []);

  return (
    <header className="header pt-[12px]">
      <a
        href="https://discord.com/invite/TXBr4pbmCJ"
        target="_blank"
        className="d-block min-h-[40px] py-1 px-8 leading-5 flex justify-center items-center bg-light-purple text-space-blue col-span-3 text-center"
      >
        We are currently in beta running on the testnet. If you have any problem using it, come and chat on our Discord
        →
      </a>
      <div className="h-[60px] md:h-[120px] max-w-full flex flex-col">
        <div className="absolute mt-3 md:mt-0 md:h-[120px] z-10 w-full grid items-center px-3 md:px-12 grid-areas-header-mobile grid-cols-header-mobile md:grid-areas-header-desktop md:grid-cols-header-desktop backdrop-blur-[7px] md:backdrop-blur-[0px]">
          <div className="md:hidden grid-in-burger-button flex flex-row" onClick={toggleOpenedMenu}>
            <div className={cn("p-2", openedMenu ? "bg-white/10" : "")}>
              <BurgerMenuIcon size={24} className="fill-white" />
            </div>
          </div>
          <div
            className={cn(
              "text-light-purple/66 grid-in-menu justify-self-center md:justify-self-start flex flex-col md:block items-center md:items-start -mx-3 md:mx-0 mt-3 md:mt-0 bg-white/10 md:bg-transparent w-screen md:w-auto",
              openedMenu ? "" : "hidden md-block"
            )}
          >
            <NavLink to="/contributions" className={({ isActive }) => cn("h-10 leading-10", isActive && "text-white")}>
              Contributions
            </NavLink>
            <NavLink className={({ isActive }) => cn("md:ml-8 h-10 leading-10", isActive && "text-white")} to="/">
              Projects
            </NavLink>
          </div>
          <div className="grid-in-logo">
            <Link to="/">
              <img src={logo} width="68px" alt="OnlyDust" />
            </Link>
          </div>
          <Suspense fallback={"Connection..."}>
            <ProfileHeader displayMenu={openedMenu} />
          </Suspense>
        </div>
      </div>
    </header>
  );
};

export default Header;
