import cn from "classnames";
import { FC } from "react";
import GitHubLogin from "react-github-login";

import config from "src/config";
import GithubIcon from "src/icons/Github";
import Loader from "src/icons/Loader";

import Modal from "src/components/Modal";

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

const GithubSignin: FC<Props> = ({
  isLoading,
  isSuccess,
  displayError,
  className,
  onClose,
  onFailure,
  onSuccess,
  error,
}) => {
  if (isSuccess) {
    return (
      <div className="flex flex-col justify-center items-center text-4xl text-center text-green-500 mt-12">
        Your Github account has been linked to your NFT profile
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center text-4xl text-center text-blue-500 mt-12">
        <Loader className="animate-spin mr-4 mb-4" size={62} />
        <div>We are verifying your information before minting your NFT profile</div>
      </div>
    );
  }

  return (
    <GitHubLogin
      redirectUri={`${config.GITHUB_REDIRECT_URI}?action=login%26provider=github`}
      clientId={config.GITHUB_CLIENT_ID}
      onSuccess={onSuccess}
      onFailure={onFailure}
      className={cn(
        className,
        "flex flex-row bg-black px-8 py-4 rounded-md text-xl shadow-white/20 shadow-sm hover:bg-neutral-900 outline-0"
      )}
    >
      <GithubIcon className="fill-white" />
      <div className="ml-4 font-bold">Connect your Github account</div>
      {renderError()}
    </GitHubLogin>
  );

  function renderError() {
    if (error) {
      return (
        <Modal isOpen={displayError} onClose={onClose}>
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
