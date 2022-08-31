import { InjectedConnector, useStarknet } from "@starknet-react/core";
import { FC, useCallback, useEffect, useState } from "react";
import { useRecoilValue_TRANSITION_SUPPORT_UNSTABLE, useSetRecoilState } from "recoil";
import { displayRegisterModalAtom, isGithubRegisteredSelector } from "src/state";
import { ButtonProps } from "src/components/Button";
import MultiWalletConnection from "./View";

type Props = {
  theme?: ButtonProps["theme"];
  size?: ButtonProps["size"];
};

const MultiWalletConnectionContainer: FC<Props> = ({ size, theme }) => {
  const { account, connect } = useStarknet();
  const [isConnecting, setIsConnecting] = useState(false);

  const isGithubRegistered = useRecoilValue_TRANSITION_SUPPORT_UNSTABLE(isGithubRegisteredSelector);
  const setDisplayRegisterModal = useSetRecoilState(displayRegisterModalAtom);

  useEffect(() => {
    if (account && isConnecting) {
      if (!isGithubRegistered) {
        setDisplayRegisterModal(true);
      }
    }
  }, [account, isConnecting]);

  const onConnectArgentX = useCallback(async () => {
    setIsConnecting(true);

    const argentXId = window.starknet?.id || "argentX";
    await connect(new InjectedConnector({ options: { id: argentXId } }));
  }, [connect, isGithubRegistered]);

  const onConnectBraavos = useCallback(async () => {
    setIsConnecting(true);
    await connect(new InjectedConnector({ options: { id: "braavos" } }));
  }, [connect, isGithubRegistered]);

  return (
    <MultiWalletConnection
      onConnectArgentX={onConnectArgentX}
      onConnectBraavos={onConnectBraavos}
      size={size}
      theme={theme}
    />
  );
};

export default MultiWalletConnectionContainer;
