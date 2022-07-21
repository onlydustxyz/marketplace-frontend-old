import { FC, Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import cn from "classnames";

import ConnectDot from "src/components/ConnectDot";
import ProfileIcon from "src/icons/Profile";
import { minimizeAddress } from "src/utils/web3";
import Arrow from "src/icons/Arrow";
import GithubSignin from "src/App/Routes/Modals/RegisterModal/GithubSignin";

type Props = {
  accountAddress: string | undefined;
  githubHandle: number | undefined;
};

const ProfileMenu: FC<Props> = ({ accountAddress, githubHandle }) => {
  return (
    <Popover as="div" className="relative inline-block text-left">
      {({ open }) => (
        <>
          <Popover.Button
            className={cn(
              "flex flex-row items-center h-[40px] px-3.5 rounded-full cursor-pointer outline-none",
              open ? "bg-profile-button" : "bg-space-blue"
            )}
          >
            <ProfileIcon className="fill-white mr-3.5" size={18} />
            <div className="flex flex-col justify-center gap-[5px] mr-1">
              <ConnectDot connected={!!accountAddress} />
              <ConnectDot connected={!!githubHandle} />
            </div>
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Popover.Panel className="absolute right-0 mt-2 px-3.5 w-[218px] origin-top-right bg-profile-menu rounded-[20px] focus:outline-none z-50 divide-y divide-white/15">
              <div className="h-[57px] flex flex-row items-center">
                <ConnectDot connected={!!accountAddress} className="ml-2 mr-4" />
                <div className="flex flex-col justify-center">
                  <div className="text-xs uppercase">Wallet</div>
                  <div className="text-white leading-5">
                    {accountAddress ? minimizeAddress(accountAddress) : "Not connected"}
                  </div>
                </div>
              </div>
              <div className="h-[57px] flex flex-row items-center">
                <ConnectDot connected={!!githubHandle} className="ml-2 mr-4" />
                <div className="flex flex-col flex-grow justify-center">
                  <div className="text-xs uppercase">Github</div>
                  <div className="text-white leading-5">{githubHandle ? githubHandle : "Not connected"}</div>
                </div>
                {!githubHandle && (
                  <GithubSignin className="h-[25px] w-[25px] mr-1">
                    <div className="h-[25px] w-[25px] flex justify-center items-center bg-white rounded">
                      <Arrow className="fill-mid-blue -rotate-45" size={12} />
                    </div>
                  </GithubSignin>
                )}
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default ProfileMenu;
