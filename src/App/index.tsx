import { RecoilRoot } from "recoil";
import AppRoutes from "./Routes";
import StarknetLocalProvider from "src/App/StarknetLocalProvider";

export default function App() {
  return (
    <StarknetLocalProvider>
      <RecoilRoot>
        <AppRoutes />
      </RecoilRoot>
    </StarknetLocalProvider>
  );
}
