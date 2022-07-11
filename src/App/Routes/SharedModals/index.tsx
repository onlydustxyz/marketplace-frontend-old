import { FC, PropsWithChildren } from "react";

import RegisterModal from "./RegisterModal";

const SharedModals: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      {children}
      <RegisterModal />
    </>
  );
};

export default SharedModals;
