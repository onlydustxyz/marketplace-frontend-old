import { FC } from "react";
import { NavLink } from "react-router-dom";

import ConnectButton from "src/components/ConnectButton";
import ProfileMenu from "./ProfileMenu";

type Props = {
  accountAddress: string | undefined;
};

const ProfileHeader: FC<Props> = ({ accountAddress }) => {
  if (!accountAddress) {
    return (
      <ConnectButton theme="secondary" size="small">
        Connect Wallet
      </ConnectButton>
    );
  }

  return (
    <>
      <div className="text-light-purple/66">
        <NavLink className={({ isActive }) => (isActive ? "text-white mr-10" : "mr-10")} to="/my-contributions">
          My contributions
        </NavLink>
      </div>
      <ProfileMenu />
    </>
  );
};

export default ProfileHeader;
