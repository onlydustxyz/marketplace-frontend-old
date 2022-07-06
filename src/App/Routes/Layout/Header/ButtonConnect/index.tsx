import { InjectedConnector, useStarknet } from "@starknet-react/core";

import Button from "./Button";
import { useCallback } from "react";

export default function ButtonConnect() {
  const { account, connect } = useStarknet();

  const onConnect = useCallback(async () => {
    await connect(new InjectedConnector({ options: { id: "argent-x" } }));
  }, [connect]);

  if (account) {
    return null;
  }

  return (
    <Button theme="secondary" onClick={onConnect}>
      Connect wallet
    </Button>
  );
}
