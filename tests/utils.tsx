import { FC, PropsWithChildren, Suspense } from "react";
import { MutableSnapshot, RecoilRoot } from "recoil";
import { render } from "@testing-library/react";
import { VirtuosoMockContext } from "react-virtuoso";

import { StarknetProvider } from "@starknet-react/core";
import App from "src/App";

import "./js-dom-mock";
import { BrowserRouter } from "react-router-dom";
import Modals from "src/App/Routes/Modals";

interface CustomRenderParams {
  initializeRecoilState?: (snapshop: MutableSnapshot) => void;
}

const buildWrapper = ({ initializeRecoilState }: CustomRenderParams) => {
  const wrapper: FC<PropsWithChildren> = ({ children }) => {
    return (
      <StarknetProvider>
        <RecoilRoot initializeState={initializeRecoilState}>
          <BrowserRouter>
            <Modals>
              <Suspense>
                <VirtuosoMockContext.Provider value={{ viewportHeight: 3000, itemHeight: 100 }}>
                  {children}{" "}
                </VirtuosoMockContext.Provider>
              </Suspense>
            </Modals>
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

interface RenderWithRouterParams {
  route?: string;
}

export const renderApp = ({ route = "/" }: RenderWithRouterParams = {}) => {
  window.history.pushState({}, "Test page", route);

  return render(<App />);
};

export * from "@testing-library/react";
export { customRender as render };
