import { InjectedConnector, useStarknet } from "@starknet-react/core";
import { FC, useCallback } from "react";
import ConnectButton from "./View";

const ConnectButtonContainer: FC = () => {
  const { account, connect } = useStarknet();

  const onConnect = useCallback(() => {
    connect(new InjectedConnector({ options: { id: "argent-x" } }));
  }, [connect]);

  return <ConnectButton account={account} onConnect={onConnect} />;
};

export default ConnectButtonContainer;
