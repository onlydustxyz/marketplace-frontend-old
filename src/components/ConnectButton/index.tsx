import { InjectedConnector, useStarknet } from "@starknet-react/core";
import { FC, PropsWithChildren, useCallback } from "react";
import ConnectButton from "./View";

const ConnectButtonContainer: FC<PropsWithChildren> = ({ children }) => {
  const { account, connect } = useStarknet();

  const onConnect = useCallback(() => {
    connect(new InjectedConnector({ options: { id: "argent-x" } }));
  }, [connect]);

  return (
    <ConnectButton account={account} onConnect={onConnect}>
      {children}
    </ConnectButton>
  );
};

export default ConnectButtonContainer;
