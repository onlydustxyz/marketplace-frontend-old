import { FC } from "react";
import { useRecoilState } from "recoil";
import { displayRegisterModalAtom } from "src/state";
import RegisterModal from "./View";

const RegisterModalContainer: FC = () => {
  const [displayModal, setDisplayModal] = useRecoilState(displayRegisterModalAtom);

  return (
    <RegisterModal
      displayModal={displayModal}
      onClose={() => {
        setDisplayModal(false);
      }}
    />
  );
};

export default RegisterModalContainer;
