import { FC, PropsWithChildren } from "react";

import Button, { ButtonProps } from "src/components/Button";
import Loader from "src/icons/Loader";
import type { InstalledWallet } from ".";

type Props = {
  theme?: ButtonProps["theme"];
  size?: ButtonProps["size"];
  onConnect: (walletId: string) => void;
  installedWallets: InstalledWallet[];
};

const MultiWalletConnection: FC<PropsWithChildren<Props>> = ({ installedWallets, onConnect, size, theme }) => {
  if (installedWallets == undefined) {
    return <Loader className="animate-spin mt-4" size={24} />;
  }

  if (installedWallets.length === 0) {
    return (
      <div>
        You need to installed a wallet working with Starknet like{" "}
        <a className="underline" href="https://braavos.app/" target="_blank">
          Braavos
        </a>{" "}
        or{" "}
        <a className="underline" href="https://www.argent.xyz/argent-x/" target="_blank">
          Argent X
        </a>
        .
      </div>
    );
  }
  return (
    <div className="flex flex-col max-w-full items-stretch overflow-hidden gap-3">
      {installedWallets.map(installedWallet => (
        <Button key={installedWallet.id} theme={theme} onClick={() => onConnect(installedWallet.id)} size={size}>
          Connect {installedWallet.name} Wallet
        </Button>
      ))}
    </div>
  );
};

export default MultiWalletConnection;
