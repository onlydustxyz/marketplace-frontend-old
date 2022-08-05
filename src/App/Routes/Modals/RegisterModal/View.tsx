import { FC } from "react";
import GithubSignin from "src/App/Routes/Modals/RegisterModal/GithubSignin";
import ModalConnectButton from "src/components/ModalConnectButton";

import Modal from "src/components/Modal";
import { minimizeAddress } from "src/utils/web3";
import { AccountInterface } from "starknet";
import ConnectionState from "./ConnectionState";

type Props = {
  account: AccountInterface | undefined;
  githubHandle: string | undefined;
  displayModal: boolean;
  onClose: () => void;
};

const RegisterModal: FC<Props> = ({ account, displayModal, githubHandle, onClose }) => {
  return (
    <Modal
      contentClassName="px-16 pt-11 pb-16 max-w-screen-md"
      onClose={onClose}
      isOpen={displayModal && (!account || !githubHandle)}
    >
      <div className="flex flex-col items-center">
        <div className="flex flex-row items-center justify-center gap-5">
          <ConnectionState
            providerName="Wallet"
            connected={!!account}
            accountLabel={account?.address ? minimizeAddress(account.address) : undefined}
          />
          <ConnectionState providerName="Github" connected={!!githubHandle} accountLabel={githubHandle} />
        </div>
        {!account ? renderConnectWallet() : renderConnectGithub()}
      </div>
    </Modal>
  );

  function renderConnectWallet() {
    return (
      <>
        <p className="mt-9 mb-11 font-alfreda font-bold text-5xl">If you wish to contribute, connect your Wallet</p>
        <ModalConnectButton>Connect</ModalConnectButton>
      </>
    );
  }

  function renderConnectGithub() {
    return (
      <>
        <p className="mt-9 mb-11 font-alfreda font-bold text-5xl">If you wish to contribute, connect your Github</p>
        <GithubSignin />
      </>
    );
  }
};

export default RegisterModal;
