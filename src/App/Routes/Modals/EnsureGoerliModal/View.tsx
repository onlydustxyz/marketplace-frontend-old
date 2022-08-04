import { FC } from "react";

import Modal from "src/components/Modal";

type Props = {
  displayModal: boolean;
  refreshPage: () => void;
};

const EnsureGoerliModal: FC<Props> = ({ displayModal, refreshPage }) => {
  return (
    <Modal
      contentClassName="px-16 py-16 max-w-screen-md"
      disableClose
      isOpen={displayModal}
      onClose={() => {
        return;
      }}
    >
      <div className="text-3xl text-red-400/80">Our platform require you to be connected to the Goerli network</div>
      <div className="text-2xl text-light-purple/50 mt-4">
        Change it in your wallet and{" "}
        <a href="#" onClick={refreshPage} className="underline">
          refresh the page
        </a>
      </div>
    </Modal>
  );
};

export default EnsureGoerliModal;
