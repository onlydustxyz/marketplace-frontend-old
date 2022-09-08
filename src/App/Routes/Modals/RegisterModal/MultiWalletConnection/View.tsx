import { FC, PropsWithChildren } from "react";

import Button, { ButtonProps } from "src/components/Button";

type Props = {
  theme?: ButtonProps["theme"];
  size?: ButtonProps["size"];
  onConnectArgentX: () => void;
  onConnectBraavos: () => void;
};

const MultiWalletConnection: FC<PropsWithChildren<Props>> = ({ onConnectArgentX, onConnectBraavos, size, theme }) => {
  return (
    <div className="flex flex-col max-w-full items-center overflow-hidden gap-3">
      <Button theme={theme} onClick={onConnectArgentX} size={size}>
        Connect ArgentX Wallet
      </Button>
      <Button theme={theme} onClick={onConnectBraavos} size={size}>
        Connect Braavos Wallet
      </Button>
    </div>
  );
};

export default MultiWalletConnection;
