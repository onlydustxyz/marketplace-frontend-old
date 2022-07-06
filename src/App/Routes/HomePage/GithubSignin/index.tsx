import { useStarknet } from "@starknet-react/core";
import { getStarknet } from "get-starknet";
import { FC, useCallback, useEffect, useState } from "react";
import { usePrevious } from "react-use";

import config from "src/config";
import { useGithubAccount } from "src/hooks/github-account";
import { signMessage } from "src/utils/wallet";
import GithubSignin from "src/App/Routes/HomePage/GithubSignin/View";

type Props = {
  className?: string;
};

const GithubSigninContainer: FC<Props> = ({ className }) => {
  const { account } = useStarknet();
  const starknet = getStarknet();

  const { connect, isLoading, error, isSuccess } = useGithubAccount();

  const [displayError, setDisplayError] = useState(false);
  const prevHasError = usePrevious(!!error);

  const onSuccess = async ({ code }: { code: string }) => {
    if (!account) {
      console.warn("First ensure wallet is connected before displaying this component");
      return;
    }

    const { hash, signature } = await signMessage(
      starknet.account,
      account,
      config.STARKNET_NETWORK === "mainnet-alpha" ? "SN_MAIN" : "SN_GOERLI"
    );

    connect({
      address: account,
      code,
      hash,
      signature,
    });
  };

  const onFailure = useCallback((error: Error) => {
    console.warn(error);
  }, []);

  const onClose = useCallback(() => {
    setDisplayError(false);
  }, []);

  useEffect(() => {
    if (error && !prevHasError) {
      setDisplayError(true);
    }
  }, [error]);

  return (
    <GithubSignin
      isLoading={isLoading}
      isSuccess={isSuccess}
      onClose={onClose}
      onSuccess={onSuccess}
      onFailure={onFailure}
      error={error}
      displayError={displayError}
      className={className}
    />
  );
};

export default GithubSigninContainer;
