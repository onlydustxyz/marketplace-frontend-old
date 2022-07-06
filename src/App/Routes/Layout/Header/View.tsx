import ConnectButton from "./ConnectButton";
import { minimizeAddress } from "src/utils/web3";
import { FC } from "react";

type Props = {
  account?: string;
};
const Header: FC<Props> = ({ account }) => {
  return (
    <header className="flex flex-row items-center mb-12">
      <div className="grow h-[120px] flex flex-row items-center">
        <div className="ml-6 text-4xl font-alfreda">Deathnote</div>
      </div>
      {renderButton()}
    </header>
  );

  function renderButton() {
    if (!account) {
      return <ConnectButton />;
    }

    return (
      <div className="flex flex-row items-center">
        <div>
          <span>Your wallet address: </span>
          {minimizeAddress(account)}
        </div>
      </div>
    );
  }
};

export default Header;
