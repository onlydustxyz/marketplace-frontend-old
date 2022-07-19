import { FC, PropsWithChildren } from "react";

import Button, { ButtonProps } from "src/components/Button";

type Props = {
  theme?: ButtonProps["theme"];
  size?: ButtonProps["size"];
  onConnect: () => void;
};

const ConnectButton: FC<PropsWithChildren<Props>> = ({ children, onConnect, size, theme }) => {
  return (
    <Button theme={theme} onClick={onConnect} size={size}>
      {children}
    </Button>
  );
};

export default ConnectButton;
