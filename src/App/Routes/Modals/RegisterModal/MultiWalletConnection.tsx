import { InjectedConnector, useStarknet } from "@starknet-react/core";
import { FC, PropsWithChildren, useCallback, useEffect, useState } from "react";
import { useRecoilValue_TRANSITION_SUPPORT_UNSTABLE, useSetRecoilState } from "recoil";
import { displayRegisterModalAtom, isGithubRegisteredSelector } from "src/state";
import Button, { ButtonProps } from "src/components/Button";

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

  const onConnectArgentX = useCallback(async () => {
    setIsConnecting(true);
    await connect(new InjectedConnector({ options: { id: "argent-x" } }));
  }, [connect, isGithubRegistered]);

  const onConnectBraavos = useCallback(async () => {
    setIsConnecting(true);
    await connect(new InjectedConnector({ options: { id: "braavos" } }));
  }, [connect, isGithubRegistered]);

  return (
    <div>
      <div>
        <Button onClick={onConnectArgentX} size={size} theme={theme}>
          {children} Argentx Wallet
        </Button>
      </div>
      <div className="mt-3">
        <Button onClick={onConnectBraavos} size={size} theme={theme}>
          {children} Braavos Wallet
        </Button>
      </div>
    </div>
  );
};

export default ConnectButtonContainer;
