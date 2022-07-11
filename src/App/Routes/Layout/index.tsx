import { FC, PropsWithChildren, Suspense } from "react";

import Header from "./Header";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="max-w-screen-lg w-full mx-auto">
      <Suspense fallback={"loading ..."}>
        <Header />
        <div className="flex flex-col items-center">{children}</div>
      </Suspense>
    </div>
  );
};

export default Layout;
