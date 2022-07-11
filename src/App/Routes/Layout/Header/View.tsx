import ConnectButton from "src/components/ConnectButton";
import { minimizeAddress } from "src/utils/web3";
import { FC } from "react";

type Props = {
  accountAddress?: string;
  isRegistered: boolean;
  onClickFinalizeRegistration: () => void;
};

const Header: FC<Props> = ({ accountAddress, isRegistered, onClickFinalizeRegistration }) => {
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
      return <ConnectButton>Connect Wallet</ConnectButton>;
    }

    return (
      <div className="flex flex-col items-center">
        <div className="flex flex-row">
          <span>Your wallet address: </span>
          {minimizeAddress(accountAddress)}
        </div>
        {!isRegistered && (
          <div className="cursor-pointer" onClick={onClickFinalizeRegistration}>
            Finalize registration
          </div>
        )}
      </div>
    );
  }
};

export default Header;
