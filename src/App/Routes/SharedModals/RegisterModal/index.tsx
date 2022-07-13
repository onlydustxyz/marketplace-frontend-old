import { FC } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { displayRegisterModalAtom, isGithubRegisteredSelector } from "src/state";
import RegisterModal from "./View";

const RegisterModalContainer: FC = () => {
  const [displayModal, setDisplayModal] = useRecoilState(displayRegisterModalAtom);
  const isGithubRegistered = useRecoilValue(isGithubRegisteredSelector);

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
