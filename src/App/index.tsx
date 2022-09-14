import { RecoilRoot } from "recoil";
import { ErrorBoundary } from "react-error-boundary";
import AppRoutes from "./Routes";
import StarknetLocalProvider from "src/App/StarknetLocalProvider";
import StarknetSyncState from "./StarknetSyncState";
import ErrorFallback from "src/App/ErrorFallback";
import { trackingErrorHandler } from "src/utils/error-boundary";

export default function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={trackingErrorHandler}>
      <StarknetLocalProvider>
        <RecoilRoot>
          <StarknetSyncState>
            <AppRoutes />
          </StarknetSyncState>
        </RecoilRoot>
      </StarknetLocalProvider>
    </ErrorBoundary>
  );
}
