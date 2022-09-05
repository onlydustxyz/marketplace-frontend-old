import { FC, PropsWithChildren, Suspense } from "react";
import { MutableSnapshot, RecoilRoot } from "recoil";
import { BrowserRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import { StarknetProvider } from "@starknet-react/core";

interface CustomRenderParams {
  initializeRecoilState?: (snapshop: MutableSnapshot) => void;
}

const buildWrapper = ({ initializeRecoilState }: CustomRenderParams) => {
  const wrapper: FC<PropsWithChildren> = ({ children }) => {
    return (
      <StarknetProvider>
        <RecoilRoot initializeState={initializeRecoilState}>
          <BrowserRouter>
            <Suspense>{children}</Suspense>
          </BrowserRouter>
        </RecoilRoot>
      </StarknetProvider>
    );
  };

  return wrapper;
};

const customRender = (
  ui: Parameters<typeof render>[0],
  options: Parameters<typeof render>[1] = {},
  params: CustomRenderParams = {}
) => render(ui, { wrapper: buildWrapper(params), ...options });

export * from "@testing-library/react";
export { customRender as render };
