import { ReactNode } from "react";
import { InjectedConnector, StarknetProvider } from "@starknet-react/core";
import { Provider } from "starknet";
import config from "src/config";

const connectors = [new InjectedConnector()];

export default function StarknetLocalProvider({ children }: { children?: ReactNode | undefined }) {
  return (
    <StarknetProvider connectors={connectors} defaultProvider={getProvider()} autoConnect>
      {children}
    </StarknetProvider>
  );
}

function getProvider() {
  if (config.PROVIDER_NETWORK === "localhost") {
    return new Provider({ baseUrl: config.PROVIDER_HOSTNAME });
  }

  return new Provider({ network: config.PROVIDER_NETWORK });
}
