import { FC, PropsWithChildren, Suspense } from "react";
import EnsureGoerliModal from "./EnsureGoerliModal";

import RegisterModal from "./RegisterModal";

const Modals: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      {children}
      <Suspense>
        <EnsureGoerliModal />
        <RegisterModal />
      </Suspense>
    </>
  );
};

export default Modals;
