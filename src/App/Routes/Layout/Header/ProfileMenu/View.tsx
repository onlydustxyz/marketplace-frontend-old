import { FC } from "react";
import { NavLink } from "react-router-dom";

import ConnectButton from "src/components/ConnectButton";
import { minimizeAddress } from "src/utils/web3";

type Props = {
  accountAddress: string | undefined;
  onClickFinalizeRegistration: () => void;
};

const ProfileMenu: FC<Props> = ({ accountAddress }) => {
  if (!accountAddress) {
    return (
      <ConnectButton theme="secondary" size="small">
        Connect Wallet
      </ConnectButton>
    );
  }

  return (
    <>
      <div className="text-light-purple/66">
        <NavLink className={({ isActive }) => (isActive ? "text-white mr-10" : "mr-10")} to="/my-contributions">
          My contributions
        </NavLink>
      </div>
      <div className="flex flex-col items-end">
        <div className="flex flex-row items-center">
          <div className=" text-light-purple/30">{minimizeAddress(accountAddress)}</div>
          <div className="ml-[10px] h-[7px] w-[7px] bg-[#4DFFB4] rounded shadow-connected"></div>
        </div>
        {/* {!isRegistered && (
        <div className="cursor-pointer" onClick={onClickFinalizeRegistration}>
        Finalize registration
        </div>
      )} */}
      </div>
    </>
  );
};

export default ProfileMenu;
