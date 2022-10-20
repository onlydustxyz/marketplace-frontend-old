import { FC } from "react";
import { useRecoilState_TRANSITION_SUPPORT_UNSTABLE, useRecoilValue_TRANSITION_SUPPORT_UNSTABLE } from "recoil";
import {
  contributorAccountAddressSelector,
  displayRegisterModalAtom,
  userDiscordHandleSelector,
  userGithubHandleSelector,
} from "src/state";
import RegisterModal from "./View";

const RegisterModalContainer: FC = () => {
  const accountAddress = useRecoilValue_TRANSITION_SUPPORT_UNSTABLE(contributorAccountAddressSelector);
  const userGithubHandle = useRecoilValue_TRANSITION_SUPPORT_UNSTABLE(userGithubHandleSelector);
  const userDiscordHandle = useRecoilValue_TRANSITION_SUPPORT_UNSTABLE(userDiscordHandleSelector);

  const [displayModal, setDisplayModal] = useRecoilState_TRANSITION_SUPPORT_UNSTABLE(displayRegisterModalAtom);
  return (
    <RegisterModal
      accountAddress={accountAddress}
      githubHandle={userGithubHandle?.toString()}
      discordHandle={userDiscordHandle}
      displayModal={displayModal}
      onClose={() => {
        setDisplayModal(false);
      }}
    />
  );
};

export default RegisterModalContainer;
