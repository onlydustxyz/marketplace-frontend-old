import ConnectButton from "./ConnectButton";
import { minimizeAddress } from "src/utils/web3";
import { FC } from "react";

type Props = {
  accountAddress?: string;
};
const Header: FC<Props> = ({ accountAddress }) => {
  return (
    <header className="flex flex-row items-center mb-12">
      <div className="grow h-[120px] flex flex-row items-center">
        <div className="ml-6 text-4xl font-alfreda">Deathnote</div>
      </div>
      {renderButton()}
    </header>
  );

  function renderButton() {
    if (!accountAddress) {
      return <ConnectButton />;
    }

    return (
      <div className="flex flex-row items-center">
        <div>
          <span>Your wallet address: </span>
          {minimizeAddress(accountAddress)}
        </div>
      </div>
    );
  }
};

export default Header;
