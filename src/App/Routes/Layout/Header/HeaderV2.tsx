import cn from "classnames";
import { FC, Suspense, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import BurgerMenuIcon from "src/icons/BurgerMenu";
import Logo from "src/icons/Logo";
import LogoSquare from "src/icons/LogoSquare";
import TabContributions from "src/icons/TabContributions";
import TabProjects from "src/icons/TabProjects";

import ProfileHeader from "./ProfileHeaderV2";
import HeaderTab from "./Tab";

interface Props {
  accountAddress?: string;
}

const Header: FC<Props> = ({ accountAddress }) => {
  const [openedMenu, setOpenedMenu] = useState(false);

  const toggleOpenedMenu = useCallback(() => {
    setOpenedMenu(currentOpenedMenu => !currentOpenedMenu);
  }, []);

  return (
    <header>
      <a
        href="https://discord.com/invite/TXBr4pbmCJ"
        target="_blank"
        className="d-block min-h-[40px] py-1 px-8 leading-5 flex justify-center items-center bg-light-purple text-space-blue col-span-3 text-center"
      >
        We are currently in beta running on the testnet. If you have any problem using it, come and chat on our Discord
        →
      </a>
      <div className="h-[60px] md:h-[89px] px-2 md:px-[50px] w-full grid grid-areas-header-mobile grid-cols-header-mobile md:grid-areas-header-desktop md:grid-cols-header-desktop bg-black text-white">
        <Link
          to="/"
          className="h-[60px] md:h-[89px] flex flex-row items-center md:w-[200px] md:min-w-[200px] max-w-[43px] grid-in-logo"
        >
          <Logo size={43} className="fill-white hidden md:block" />
          <LogoSquare size={36} className="fill-white md:hidden" />
        </Link>
        <div className="md:hidden grid-in-burger-button flex flex-row items-center" onClick={toggleOpenedMenu}>
          <div className={cn("p-2", openedMenu ? "bg-white/10" : "")}>
            <BurgerMenuIcon size={24} className="fill-white" />
          </div>
        </div>
        <div
          className={cn(
            "grid-in-menu w-screen md:w-auto bg-black flex flex-col md:flex-row items-stretch justify-center md:gap-x-14 -mx-2 md:mx-0 z-30",
            openedMenu ? "" : "hidden md:flex"
          )}
        >
          <HeaderTab to="/contributions" dataTestId="menu-link-contributions" className="px-4 md:px-0 py-2 md:py-0">
            <TabContributions size={30} className="mr-3" /> Contributions
          </HeaderTab>
          <HeaderTab to="/" dataTestId="menu-link-projects" className="px-4 md:px-0 py-2 md:py-0">
            <TabProjects size={28} className="mr-3" /> Projects
          </HeaderTab>
          {accountAddress && (
            <HeaderTab
              to="/my-contributions"
              dataTestId="menu-link-mycontributions"
              className="px-4 md:px-0 py-2 md:py-0"
            >
              My contributions
            </HeaderTab>
          )}
        </div>
        <Suspense fallback={"Connection..."}>
          <ProfileHeader className="md:w-[200px] md:min-w-[200px]" />
        </Suspense>
      </div>
    </header>
  );
};

export default Header;
