import { useStarknet } from "@starknet-react/core";
import cn from "classnames";
import { getStarknet } from "get-starknet";
import { useCallback, useEffect, useState } from "react";
import GitHubLogin from "react-github-login";
import { usePrevious } from "react-use";

import config from "src/config";
import { useConnectGithubAccount } from "src/hooks/useConnectGithubAccount";
import GithubIcon from "src/icons/Github";
import { signMessage } from "src/utils/wallet";
import Modal from "src/components/Modal";
import Loader from "src/icons/Loader";

interface GithubSigninProps {
  className?: string;
}

export default function GithubSignin({ className }: GithubSigninProps) {
  const { account } = useStarknet();
  const starknet = getStarknet();

  const { call, abort, isLoading, data, error } = useConnectGithubAccount();

  const [displayError, setDisplayError] = useState(false);
  const prevHasError = usePrevious(!!error);

  const onSuccess = async ({ code }: { code: string }) => {
    if (!account) {
      console.warn("First ensure wallet is connected before displaying this component");
      return;
    }

    const { hash, signature } = await signMessage(
      starknet.account,
      account
      // "0x3b2683cae726e17671233e0180ac3163abc64a6ad55245b36e86357f7aeaac3"
    );

    call({
      address: account,
      code,
      hash,
      signature,
    });
  };

  const onFailure = useCallback((error: Error) => {
    console.warn(error);
  }, []);

  useEffect(() => {
    if (error && !prevHasError) {
      setDisplayError(true);
    }
  }, [error]);

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center text-4xl text-center text-blue-500 mt-12">
        <Loader className="animate-spin mr-4 mb-4" size={62} />
        <div>We are verifying your information before minting your NFT</div>
      </div>
    );
  }

  return (
    <GitHubLogin
      redirectUri="http://localhost:3000?action=login%26provider=github"
      clientId={config.GITHUB_CLIENT_ID}
      onSuccess={onSuccess}
      onFailure={onFailure}
      className={cn(
        className,
        "flex flex-row bg-black px-8 py-4 rounded-md text-xl shadow-white/20 shadow-md hover:bg-neutral-900"
      )}
    >
      <GithubIcon className="fill-white" />
      <div className="ml-4 font-bold">Sign In With Github</div>
      {renderError()}
    </GitHubLogin>
  );

  function renderError() {
    if (error) {
      return (
        <Modal isOpen={displayError} onClose={() => setDisplayError(false)}>
          <div className="text-2xl text-red-300">
            An error occurred while trying to verify your request and minting your NFT.
            <br />
            <p className="text-xl mt-2">Please try again or contact us if the problem still occurred.</p>
          </div>
        </Modal>
      );
    }
  }
}
