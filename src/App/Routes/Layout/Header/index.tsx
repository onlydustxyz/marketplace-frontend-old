import { FC, Suspense } from "react";
import { Link, NavLink } from "react-router-dom";

import logo from "src/assets/img/onlydust-logo.png";
import ProfileHeader from "./ProfileHeader";

const Header: FC = () => {
  return (
    <header
      className="header grid h-[120px] pt-[14px] px-12 items-center"
      style={{ gridTemplateColumns: "1fr 60px 1fr" }}
    >
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
    </header>
  );
};

export default Header;
