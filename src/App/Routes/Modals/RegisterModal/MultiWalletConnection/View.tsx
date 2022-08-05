import { FC, PropsWithChildren } from "react";

import Button, { ButtonProps } from "src/components/Button";

type Props = {
  theme?: ButtonProps["theme"];
  size?: ButtonProps["size"];
  onConnectArgentX: () => void;
  onConnectBraavos: () => void;
};

const MultiWalletConnection: FC<PropsWithChildren<Props>> = ({ children, onConnectArgentX, onConnectBraavos, size, theme }) => {
  return (
    <div>
      <Button className="min-w-full" theme={theme} onClick={onConnectArgentX} size={size}>
        Connect ArgentX Wallet
      </Button>
      <Button className="mt-3 min-w-full" theme={theme} onClick={onConnectBraavos} size={size}>
        Connect Braavos Wallet
      </Button>
    </div>
  );
};

export default MultiWalletConnection;
