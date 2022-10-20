import { FC } from "react";
import DiscordForm from "src/App/Routes/Modals/RegisterModal/DiscordForm";
import GithubSignin from "src/App/Routes/Modals/RegisterModal/GithubSignin";
import MultiWalletConnection from "src/App/Routes/Modals/RegisterModal/MultiWalletConnection";

import Modal from "src/components/Modal";
import { ContributorAccountAddress } from "src/model/contributors/repository";
import { minimizeAddress } from "src/utils/web3";
import ConnectionState from "./ConnectionState";

type Props = {
  accountAddress?: ContributorAccountAddress;
  githubHandle?: string;
  discordHandle?: string;
  displayModal: boolean;
  onClose: () => void;
};

const RegisterModal: FC<Props> = ({ accountAddress, displayModal, githubHandle, discordHandle, onClose }) => {
  const isOpen = displayModal && (!accountAddress || !githubHandle || !discordHandle);
  return (
    <Modal contentClassName="px-2 md:px-16 py-2 pt-11 md:pb-16 md:max-w-screen-md" onClose={onClose} isOpen={isOpen}>
      <div className="flex flex-col items-center" data-testid="register-modal">
        <div className="flex flex-col w-full px-4 md:px-0 md:w-auto md:flex-row items-center justify-center gap-2 md:gap-5">
          <ConnectionState
            providerName="Wallet"
            connected={!!accountAddress}
            accountLabel={accountAddress ? minimizeAddress(accountAddress) : undefined}
            dataTestid="wallet-connection-state"
          />
          <ConnectionState
            providerName="Github"
            connected={!!githubHandle}
            accountLabel={githubHandle}
            dataTestid="github-connection-state"
          />
          <ConnectionState
            providerName="Discord"
            connected={!!discordHandle}
            accountLabel={discordHandle}
            dataTestid="discord-connection-state"
          />
        </div>
        {accountAddress === undefined
          ? renderConnectWallet()
          : githubHandle === undefined
          ? renderConnectGithub()
          : renderConnectDiscord()}
      </div>
    </Modal>
  );

  function renderConnectWallet() {
    return (
      <>
        <p className="mt-5 mb-7 md:mt-9 md:mb-11 font-alfreda font-bold text-2xl md:text-5xl">
          If you wish to contribute, connect your Wallet
        </p>
        <MultiWalletConnection />
      </>
    );
  }

  function renderConnectGithub() {
    return (
      <>
        <p className="mt-5 mb-7 md:mt-9 md:mb-11 font-alfreda font-bold text-2xl md:text-5xl">
          If you wish to contribute, connect your Github
        </p>
        <GithubSignin />
      </>
    );
  }

  function renderConnectDiscord() {
    return (
      <>
        <p className="mt-5 mb-7 md:mt-9 md:mb-11 font-alfreda font-bold text-2xl md:text-5xl">
          If you wish to contribute, please provide your Discord handle
        </p>
        <DiscordForm />
      </>
    );
  }
};

export default RegisterModal;
