import { InjectedConnector, useStarknet } from "@starknet-react/core";
import { FC, PropsWithChildren, useCallback, useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { displayRegisterModalAtom, isGithubRegisteredSelector } from "src/state";
import ConnectButton from "./View";

const ConnectButtonContainer: FC<PropsWithChildren> = ({ children }) => {
  const { account, connect } = useStarknet();
  const [isConnecting, setIsConnecting] = useState(false);

  const isGithubRegistered = useRecoilValue(isGithubRegisteredSelector);
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

  return <ConnectButton onConnect={onConnect}>{children}</ConnectButton>;
};

export default ConnectButtonContainer;
