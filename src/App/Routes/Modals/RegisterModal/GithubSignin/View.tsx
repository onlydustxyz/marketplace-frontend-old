import { FC, PropsWithChildren } from "react";
import GithubConnect from "src/lib/react-github-connect";

import config from "src/config";
import Loader from "src/icons/Loader";

import Modal from "src/components/Modal";
import Button from "src/components/Button";

type Props = {
  isSuccess: boolean;
  isLoading: boolean;
  displayError: boolean;
  className?: string;
  onSuccess: ({ code }: { code: string }) => Promise<void>;
  onFailure: (error: Error) => void;
  onClose: () => void;
  error?: Error;
};

const GithubSignin: FC<PropsWithChildren<Props>> = ({
  isLoading,
  isSuccess,
  displayError,
  className,
  onClose,
  onFailure,
  onSuccess,
  error,
  children,
}) => {
  if (isSuccess) {
    return (
      <div className="flex flex-col justify-center items-center text-4xl text-center text-green-500 mt-12">
        Your Github account has been linked to your account
      </div>
    );
  }

  return (
    <GithubConnect
      redirectUri={`${config.GITHUB_REDIRECT_URI}?action=login%26provider=github`}
      clientId={config.GITHUB_CLIENT_ID}
      onSuccess={onSuccess}
      onFailure={onFailure}
      className={className}
    >
      {children || <Button as="div">Connect to Github</Button>}
      {renderLoadingModal()}
      {renderError()}
    </GithubConnect>
  );

  function renderLoadingModal() {
    return (
      <Modal contentClassName="px-16 pt-6 pb-8 z-100" isOpen={isLoading} onClose={onClose}>
        <div className="flex flex-col justify-center items-center text-4xl text-center text-blue-500 mt-12">
          <Loader className="animate-spin mr-4 mb-4" size={62} />
          <div>We are verifying your information</div>
          <div>Estimated remaining time: 5 mins</div>
        </div>
      </Modal>
    );
  }

  function renderError() {
    if (error) {
      return (
        <Modal contentClassName="px-16 pt-6 pb-8" isOpen={displayError} onClose={onClose}>
          <div className="text-2xl text-red-300">
            It seems you can't perform this task as your Github account is already linked to a wallet.
            <br />
            <p className="text-xl mt-2">Please refresh your page or contact us if the problem still occurred.</p>
          </div>
        </Modal>
      );
    }
  }
};

export default GithubSignin;
