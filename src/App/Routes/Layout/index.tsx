import React from "react";

import Header from "./Header";

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="max-w-screen-lg w-full mx-auto">
      <Header />
      <div className="flex flex-col items-center">{children}</div>
    </div>
  );
};

export default Layout;
