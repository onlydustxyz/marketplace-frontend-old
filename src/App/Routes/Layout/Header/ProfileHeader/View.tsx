import cn from "classnames";
import { FC } from "react";
import { NavLink } from "react-router-dom";

import ConnectButton from "src/components/ConnectButton";
import ProfileMenu from "./ProfileMenu";

type Props = {
  accountAddress: string | undefined;
  displayMenu: boolean;
};

const ProfileHeader: FC<Props> = ({ accountAddress, displayMenu }) => {
  if (!accountAddress) {
    return (
      <div className="flex flex-row justify-end grid-in-profile">
        <ConnectButton theme="secondary" size="small" dataTestid="header-connect-button">
          <span className="hidden md:block">Connect Wallet</span>
          <span className="block md:hidden">Connect</span>
        </ConnectButton>
      </div>
    );
  }

  return (
    <>
      <div
        className={cn(
          "text-light-purple/66 grid-in-menu-right justify-self-center md:justify-self-end flex flex-col md:block items-center md:items-start -mx-3 mt-0 md:mt-0 bg-white/10 md:bg-transparent w-screen md:w-auto",
          displayMenu ? "" : "hidden md-block"
        )}
      >
        <NavLink
          className={({ isActive }) => cn("md:mr-10 h-10 leading-10", isActive && "text-white")}
          to="/my-contributions"
        >
          My contributions
        </NavLink>
      </div>
      <ProfileMenu className="grid-in-profile justify-self-end" />
    </>
  );
};

export default ProfileHeader;
