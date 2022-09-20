import { FC, PropsWithChildren } from "react";

import Button, { ButtonProps } from "src/components/Button";

type Props = {
  theme?: ButtonProps["theme"];
  size?: ButtonProps["size"];
  onConnect: () => void;
  dataTestid?: string;
};

const ConnectButton: FC<PropsWithChildren<Props>> = ({ children, onConnect, size, theme, dataTestid }) => {
  return (
    <Button theme={theme} onClick={onConnect} size={size} dataTestid={dataTestid}>
      {children}
    </Button>
  );
};

export default ConnectButton;
