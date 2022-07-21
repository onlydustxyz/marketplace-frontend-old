import { FC } from "react";
import { useRecoilValue_TRANSITION_SUPPORT_UNSTABLE } from "recoil";

import { accountAtom, userGithubHandleSelector } from "src/state";

import ProfileMenu from "./View";

const ProfileMenuContainer: FC = () => {
  const account = useRecoilValue_TRANSITION_SUPPORT_UNSTABLE(accountAtom);
  const githubHandle = useRecoilValue_TRANSITION_SUPPORT_UNSTABLE(userGithubHandleSelector);

  return <ProfileMenu accountAddress={account?.address} githubHandle={githubHandle} />;
};

export default ProfileMenuContainer;
