import { FC, PropsWithChildren } from "react";

import Header from "./Header";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="mx-auto flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow flex flex-col items-center">{children}</div>
    </div>
  );
};

export default Layout;
