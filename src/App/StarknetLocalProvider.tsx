import { ReactNode, useEffect, useState } from "react";
import { StarknetProvider } from "@starknet-react/core";
import { Provider } from "starknet";
import { getInstalledWallets } from "get-starknet";

import config from "src/config";
import { CustomInjectedConnector } from "src/utils/custom-injected-connector";

export default function StarknetLocalProvider({ children }: { children?: ReactNode | undefined }) {
  const [installedConnectors, setInstalledConnectors] = useState<CustomInjectedConnector[]>([]);

  useEffect(() => {
    (async () => {
      const installedWallets = await getInstalledWallets();

      const installed = installedWallets.map(wallet => wallet.id);
      setInstalledConnectors(installed.map(id => new CustomInjectedConnector({ options: { id } }, installedWallets)));
    })();
  }, []);
  if (installedConnectors.length === 0) {
    return null;
  }

  return (
    <StarknetProvider connectors={installedConnectors} defaultProvider={getProvider()} autoConnect>
      {children}
    </StarknetProvider>
  );
}

function getProvider() {
  if (config.STARKNET_NETWORK === "localhost") {
    return new Provider({ sequencer: { baseUrl: config.STARKNET_HOSTNAME } });
  }

  return new Provider({ sequencer: { network: config.STARKNET_NETWORK } });
}
