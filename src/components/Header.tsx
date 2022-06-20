import { useCallback } from "react";
import { useStarknet } from "@starknet-react/core";

import ButtonConnect from "src/components/ButtonConnect";
import Button from "src/components/Button";
import { minimizeAddress } from "src/utils/web3";

export default function Header() {
  const { account, disconnect } = useStarknet();

  const handleDisconnect = useCallback(() => {
    disconnect();
  }, [disconnect]);

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
      return <ButtonConnect />;
    }

    return (
      <div className="flex flex-row items-center">
        <div>
          <span>Your wallet address: </span>
          {minimizeAddress(account)}
        </div>
        {/* <Button theme="secondary" size="medium" className="ml-8" onClick={handleDisconnect}>
          Disconnect
        </Button> */}
      </div>
    );
  }
}
