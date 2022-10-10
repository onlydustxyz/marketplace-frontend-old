import { FC } from "react";
import { useRecoilValue_TRANSITION_SUPPORT_UNSTABLE } from "recoil";
import { accountAddressSelector } from "src/state";
import ProfileHeader from "./View";

interface Props {
  displayMenu: boolean;
  className?: string;
}

const ProfileHeaderContainer: FC<Props> = ({ className, displayMenu }) => {
  const accountAddress = useRecoilValue_TRANSITION_SUPPORT_UNSTABLE(accountAddressSelector);

  return <ProfileHeader accountAddress={accountAddress} displayMenu={displayMenu} className={className} />;
};

export default ProfileHeaderContainer;
