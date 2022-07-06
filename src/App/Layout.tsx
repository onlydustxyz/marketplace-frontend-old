import { ReactNode } from "react";
import Header from "src/components/Header";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="max-w-screen-lg w-full mx-auto">
      <Header />
      <div className="flex flex-col items-center">{children}</div>
    </div>
  );
}
