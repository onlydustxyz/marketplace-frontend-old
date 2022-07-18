import { FC, useCallback, useEffect, useState } from "react";
import { usePrevious } from "react-use";
import { useRecoilValue, useSetRecoilState } from "recoil";

import config from "src/config";
import { useGithubAccount } from "src/hooks/github-account";
import { signMessage } from "src/utils/wallet";

import { accountAtom, displayRegisterModalAtom } from "src/state";

import GithubSignin from "./View";
import { waitForTransaction } from "src/utils/starknet";

type Props = {
  className?: string;
};

const GithubSigninContainer: FC<Props> = ({ className }) => {
  const account = useRecoilValue(accountAtom);
  const setDisplayRegisterModal = useSetRecoilState(displayRegisterModalAtom);

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

    const { hash, signature } = await signMessage(
      account,
      account.address,
      config.STARKNET_NETWORK === "mainnet-alpha" ? "SN_MAIN" : "SN_GOERLI"
    );

    const transactionHash = await connect({
      address: account.address,
      code,
      hash,
      signature,
    });

    if (transactionHash) {
      await waitForTransaction(transactionHash, account);
      setDisplayRegisterModal(false);
    }

    setIsRegistering(false);
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
      isLoading={isRegistering}
      isSuccess={!isRegistering && isSuccess}
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
