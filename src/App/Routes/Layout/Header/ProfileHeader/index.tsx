import { FC } from "react";
import { useRecoilValue_TRANSITION_SUPPORT_UNSTABLE } from "recoil";
import { accountAddressSelector } from "src/state";
import ProfileHeader from "./View";

const ProfileHeaderContainer: FC = () => {
  const accountAddress = useRecoilValue_TRANSITION_SUPPORT_UNSTABLE(accountAddressSelector);

  return <ProfileHeader accountAddress={accountAddress} />;
};

export default ProfileHeaderContainer;
