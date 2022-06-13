import { InjectedConnector, useStarknet } from "@starknet-react/core";

import Button from "src/components/Button";
import { useCallback } from "react";

export default function ButtonConnect() {
  const { account, connect } = useStarknet();

  const onConnect = useCallback(async () => {
    console.log("onConnect");
    const connector = await connect(new InjectedConnector());

    console.log("connector =", connector);
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
