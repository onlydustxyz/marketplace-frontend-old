import { ReactNode } from "react";
import { InjectedConnector, StarknetProvider } from "@starknet-react/core";
import { Provider } from "starknet";

import config from "src/config";

const connectors = [new InjectedConnector()];
// const defaultProvider = new Provider({ baseUrl: config.PROVIDER_HOSTNAME });

export default function StarknetLocalProvider({ children }: { children?: ReactNode | undefined }) {
  return (
    <StarknetProvider connectors={connectors} autoConnect>
      {children}
    </StarknetProvider>
  );
}
