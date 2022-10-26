import { FC } from "react";
import { useRecoilValue_TRANSITION_SUPPORT_UNSTABLE } from "recoil";

import { contributorAccountAddressSelector, userDiscordHandleSelector, userGithubHandleSelector } from "src/state";

import ProfileMenu from "./View";

interface Props {
  className?: string;
}

const ProfileMenuContainer: FC<Props> = ({ className }) => {
  const accountAddress = useRecoilValue_TRANSITION_SUPPORT_UNSTABLE(contributorAccountAddressSelector);
  const githubHandle = useRecoilValue_TRANSITION_SUPPORT_UNSTABLE(userGithubHandleSelector);
  const discordHandle = useRecoilValue_TRANSITION_SUPPORT_UNSTABLE(userDiscordHandleSelector);

  return (
    <ProfileMenu
      accountAddress={accountAddress}
      githubHandle={githubHandle}
      discordHandle={discordHandle}
      className={className}
    />
  );
};

export default ProfileMenuContainer;
