import cn from "classnames";
import { FC } from "react";

import ConnectButton from "src/components/ConnectButton";
import ProfileMenu from "./ProfileMenu";

type Props = {
  accountAddress: string | undefined;
  className?: string;
};

const ProfileHeader: FC<Props> = ({ accountAddress, className }) => {
  if (!accountAddress) {
    return (
      <div className={cn("flex flex-row justify-end items-center grid-in-profile", className)}>
        <ConnectButton theme="secondary" size="small" dataTestid="header-connect-button">
          <span className="hidden md:block">Connect Wallet</span>
          <span className="block md:hidden">Connect</span>
        </ConnectButton>
      </div>
    );
  }

  return <ProfileMenu className={cn("grid-in-profile justify-self-end flex items-center justify-end", className)} />;
};

export default ProfileHeader;
