import { FC } from "react";
import GithubSignin from "src/components/GithubSignin";

import Modal from "src/components/Modal";

type Props = {
  displayModal: boolean;
  onClose: () => void;
};

const RegisterModal: FC<Props> = ({ displayModal, onClose }) => {
  return (
    <Modal title="Register your Github account" onClose={onClose} isOpen={displayModal}>
      <div className="flex flex-col items-center">
        <p>
          To continue using our plateform and be able to apply to contributions, we need you to connect your Github
          account with your current wallet.
        </p>
        <GithubSignin className="mt-8" />
      </div>
    </Modal>
  );
};

export default RegisterModal;
