import { FC } from "react";
import { displayRegisterModalAtom, isGithubRegisteredSelector } from "src/state";
import { useRecoilState_TRANSITION_SUPPORT_UNSTABLE, useRecoilValue_TRANSITION_SUPPORT_UNSTABLE } from "recoil";
import RegisterModal from "./View";

const RegisterModalContainer: FC = () => {
  const account = useRecoilValue_TRANSITION_SUPPORT_UNSTABLE(accountAtom);
  const userGithubHandle = useRecoilValue_TRANSITION_SUPPORT_UNSTABLE(userGithubHandleSelector);

  const [displayModal, setDisplayModal] = useRecoilState_TRANSITION_SUPPORT_UNSTABLE(displayRegisterModalAtom);
  return (
    <RegisterModal
      displayModal={displayModal && !isGithubRegistered}
      onClose={() => {
        setDisplayModal(false);
      }}
    />
  );
};

export default RegisterModalContainer;
