import { FC } from "react";
import { useRecoilValue_TRANSITION_SUPPORT_UNSTABLE } from "recoil";
import { contributorAccountAddressSelector } from "src/state";
import ProfileHeader from "./View";

interface Props {
  displayMenu: boolean;
}

const ProfileHeaderContainer: FC<Props> = ({ displayMenu }) => {
  const accountAddress = useRecoilValue_TRANSITION_SUPPORT_UNSTABLE(contributorAccountAddressSelector);

  return <ProfileHeader accountAddress={accountAddress} displayMenu={displayMenu} />;
};

export default ProfileHeaderContainer;
