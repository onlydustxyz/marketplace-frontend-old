import { FC, PropsWithChildren } from "react";

import Header from "./Header";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="mx-auto">
      <Header />
      <div className="flex flex-col items-center mx-28 mb-4">{children}</div>
    </div>
  );
};

export default Layout;
