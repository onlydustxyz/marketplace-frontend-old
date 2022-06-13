import AppRoutes from "src/App/Routes";
import StarknetLocalProvider from "src/App/StarknetLocalProvider";

export default function App() {
  return (
    <StarknetLocalProvider>
      <AppRoutes />
    </StarknetLocalProvider>
  );
}
