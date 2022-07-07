import { RecoilRoot } from "recoil";
import AppRoutes from "./Routes";
import StarknetLocalProvider from "src/App/StarknetLocalProvider";
import StarknetSyncState from "./StarknetSyncState";

export default function App() {
  return (
    <StarknetLocalProvider>
      <RecoilRoot>
        <StarknetSyncState>
          <AppRoutes />
        </StarknetSyncState>
      </RecoilRoot>
    </StarknetLocalProvider>
  );
}
