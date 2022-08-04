import { FC, Suspense } from "react";
import { Link, NavLink } from "react-router-dom";

import logo from "src/assets/img/onlydust-logo.png";
import ProfileHeader from "./ProfileHeader";

const Header: FC = () => {
  return (
    <header className="header pt-[12px]">
      <a
        href="https://discord.com/invite/TXBr4pbmCJ"
        target="_blank"
        className="d-block min-h-[40px] py-1 px-8 leading-5 flex justify-center items-center bg-light-purple text-space-blue col-span-3 text-center"
      >
        We are currently in beta running on the testnet. If you have any problem using it, come and chat on our Discord
        →
      </a>
      <div className="h-[120px] grid items-center mx-12" style={{ gridTemplateColumns: "1fr 60px 1fr" }}>
        <div className="text-light-purple/66">
          <NavLink to="/contributions" className={({ isActive }) => (isActive ? "text-white" : undefined)}>
            All contributions
          </NavLink>
          <NavLink className={({ isActive }) => (isActive ? "text-white ml-8" : "ml-8")} to="/">
            All projects
          </NavLink>
        </div>
        <div>
          <Link to="/">
            <img src={logo} width="68px" />
          </Link>
        </div>
        <div className="flex flex-row justify-end items-center">
          <Suspense fallback={"Connection..."}>
            <ProfileHeader />
          </Suspense>
        </div>
      </div>
    </header>
  );
};

export default Header;
