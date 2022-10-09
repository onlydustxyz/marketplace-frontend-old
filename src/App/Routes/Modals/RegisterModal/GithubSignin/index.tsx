import { FC, PropsWithChildren, useCallback, useEffect, useState } from "react";
import { usePrevious } from "react-use";
import { useRecoilRefresher_UNSTABLE, useRecoilValue_TRANSITION_SUPPORT_UNSTABLE } from "recoil";

import config from "src/config";
import { useGithubAccount } from "src/hooks/github-account";
import { signMessage } from "src/utils/wallet";

import { accountAtom, userInformationSelector } from "src/state";

import GithubSignin from "./View";

type Props = {
  className?: string;
};

const GithubSigninContainer: FC<PropsWithChildren<Props>> = ({ children, className }) => {
  const account = useRecoilValue_TRANSITION_SUPPORT_UNSTABLE(accountAtom);
  const refreshContributor = useRecoilRefresher_UNSTABLE(userInformationSelector);

  const [isRegistering, setIsRegistering] = useState(false);

  const { connect, error, isSuccess } = useGithubAccount();

  const [displayError, setDisplayError] = useState(false);
  const prevHasError = usePrevious(!!error);

  const onSuccess = async ({ code }: { code: string }) => {
    if (!account) {
      console.warn("First ensure wallet is connected before displaying this component");
      return;
    }

    setIsRegistering(true);

    try {
      const { hash, signature } = await signMessage(
        account,
        account.address,
        config.STARKNET_NETWORK === "mainnet-alpha" ? "SN_MAIN" : "SN_GOERLI"
      );

      await connect({
        address: account.address,
        code,
        hash,
        signature: signature as [string, string],
      });

      setIsRegistering(false);
      await refreshContributor();
    } catch (error) {
      console.warn(error);
      setIsRegistering(false);
    }
  };

  const onFailure = useCallback((error: Error) => {
    console.warn(error);
    setIsRegistering(false);
    setDisplayError(true);
  }, []);

  const onClose = useCallback(() => {
    setIsRegistering(false);
    setDisplayError(false);
  }, []);

  useEffect(() => {
    if (error && !prevHasError) {
      setDisplayError(true);
    }
  }, [error]);

  return (
    <GithubSignin
      isLoading={isRegistering}
      isSuccess={!isRegistering && isSuccess}
      onClose={onClose}
      onSuccess={onSuccess}
      onFailure={onFailure}
      error={error}
      displayError={displayError}
      className={className}
    >
      {children}
    </GithubSignin>
  );
};

export default GithubSigninContainer;
