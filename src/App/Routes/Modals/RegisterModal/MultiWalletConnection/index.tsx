import { InjectedConnector, useStarknet } from "@starknet-react/core";
import { getInstalledWallets } from "get-starknet";
import { FC, useCallback, useEffect, useState } from "react";
import { useRecoilValue_TRANSITION_SUPPORT_UNSTABLE, useSetRecoilState } from "recoil";
import { displayRegisterModalAtom, isGithubRegisteredSelector } from "src/state";
import { ButtonProps } from "src/components/Button";
import MultiWalletConnection from "./View";

type Props = {
  theme?: ButtonProps["theme"];
  size?: ButtonProps["size"];
};

export interface InstalledWallet {
  id: string;
  name: string;
  icon: string;
}

const MultiWalletConnectionContainer: FC<Props> = ({ size, theme }) => {
  const { account, connect } = useStarknet();
  const [isConnecting, setIsConnecting] = useState(false);

  const [installedWallets, setInstalledWallets] = useState<InstalledWallet[]>();

  const isGithubRegistered = useRecoilValue_TRANSITION_SUPPORT_UNSTABLE(isGithubRegisteredSelector);
  const setDisplayRegisterModal = useSetRecoilState(displayRegisterModalAtom);

  useEffect(() => {
    (async () => {
      setInstalledWallets((await getInstalledWallets()) || []);
    })();
  }, []);

  useEffect(() => {
    if (account && isConnecting) {
      if (!isGithubRegistered) {
        setDisplayRegisterModal(true);
      }
    }
  }, [account, isConnecting]);

  const onConnect = useCallback(
    (walletId: string) => {
      setIsConnecting(true);
      connect(new InjectedConnector({ options: { id: walletId } }));
    },
    [connect]
  );

  return <MultiWalletConnection onConnect={onConnect} installedWallets={installedWallets} size={size} theme={theme} />;
};

export default MultiWalletConnectionContainer;
