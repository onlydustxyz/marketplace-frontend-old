import { FC, PropsWithChildren, Suspense } from "react";

import RegisterModal from "./RegisterModal";

const SharedModals: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      {children}
      <Suspense>
        <RegisterModal />
      </Suspense>
    </>
  );
};

export default SharedModals;
