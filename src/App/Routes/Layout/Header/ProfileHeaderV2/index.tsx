import { FC } from "react";
import { useRecoilValue_TRANSITION_SUPPORT_UNSTABLE } from "recoil";
import { contributorAccountSelector } from "src/state";
import ProfileHeader from "./View";

interface Props {
  className?: string;
}

const ProfileHeaderContainer: FC<Props> = ({ className }) => {
  const accountAddress = useRecoilValue_TRANSITION_SUPPORT_UNSTABLE(contributorAccountSelector);

  return <ProfileHeader accountAddress={accountAddress} className={className} />;
};

export default ProfileHeaderContainer;
