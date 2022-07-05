import { ReactNode } from "react";
import { getInstalledInjectedConnectors, StarknetProvider } from "@starknet-react/core";
import { Provider } from "starknet";
import config from "src/config";

export default function StarknetLocalProvider({ children }: { children?: ReactNode | undefined }) {
  return (
    <StarknetProvider connectors={getInstalledInjectedConnectors()} defaultProvider={getProvider()} autoConnect>
      {children}
    </StarknetProvider>
  );
}

function getProvider() {
  if (config.STARKNET_NETWORK === "localhost") {
    return new Provider({ baseUrl: config.STARKNET_HOSTNAME });
  }

  return new Provider({ network: config.STARKNET_NETWORK });
}
