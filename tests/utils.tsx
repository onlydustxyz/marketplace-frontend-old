import { FC, PropsWithChildren, Suspense } from "react";
import { RecoilRoot } from "recoil";
import { BrowserRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import { StarknetProvider } from "@starknet-react/core";

const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <StarknetProvider>
      <RecoilRoot>
        <BrowserRouter>
          <Suspense>{children}</Suspense>
        </BrowserRouter>
      </RecoilRoot>
    </StarknetProvider>
  );
};

const customRender = (ui: Parameters<typeof render>[0], options: Parameters<typeof render>[1] = {}) =>
  render(ui, { wrapper: Providers, ...options });

export * from "@testing-library/react";
export { customRender as render };
