import { FC } from "react";
import { useRecoilState_TRANSITION_SUPPORT_UNSTABLE, useRecoilValue_TRANSITION_SUPPORT_UNSTABLE } from "recoil";
import { accountAtom, displayRegisterModalAtom, userGithubHandleSelector } from "src/state";
import RegisterModal from "./View";

const RegisterModalContainer: FC = () => {
  const account = useRecoilValue_TRANSITION_SUPPORT_UNSTABLE(accountAtom);
  const userGithubHandle = useRecoilValue_TRANSITION_SUPPORT_UNSTABLE(userGithubHandleSelector);

  const [displayModal, setDisplayModal] = useRecoilState_TRANSITION_SUPPORT_UNSTABLE(displayRegisterModalAtom);
  return (
    <RegisterModal
      account={account}
      githubHandle={userGithubHandle?.toString()}
      displayModal={displayModal}
      onClose={() => {
        setDisplayModal(false);
      }}
    />
  );
};

export default RegisterModalContainer;
