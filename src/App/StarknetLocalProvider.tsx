import { ReactNode } from "react";
import { InjectedConnector, StarknetProvider } from "@starknet-react/core";

const connectors = [new InjectedConnector()];

export default function StarknetLocalProvider({ children }: { children?: ReactNode | undefined }) {
  return (
    <StarknetProvider connectors={connectors} autoConnect>
      {children}
    </StarknetProvider>
  );
}
