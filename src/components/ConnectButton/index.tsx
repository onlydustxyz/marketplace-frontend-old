import { InjectedConnector, useStarknet } from "@starknet-react/core";
import { FC, PropsWithChildren, useCallback, useEffect, useState } from "react";
import { useRecoilValue_TRANSITION_SUPPORT_UNSTABLE, useSetRecoilState } from "recoil";
import { displayRegisterModalAtom, isGithubRegisteredSelector } from "src/state";
import { ButtonProps } from "../Button";
import ConnectButton from "./View";

type Props = {
  theme?: ButtonProps["theme"];
  size?: ButtonProps["size"];
};

const ConnectButtonContainer: FC<PropsWithChildren<Props>> = ({ children, size, theme }) => {
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

  const onConnect = useCallback(async () => {
    setIsConnecting(true);
    await connect(new InjectedConnector({ options: { id: "argent-x" } }));
  }, [connect, isGithubRegistered]);

  return (
    <ConnectButton onConnect={onConnect} size={size} theme={theme}>
      {children}
    </ConnectButton>
  );
};

export default ConnectButtonContainer;
