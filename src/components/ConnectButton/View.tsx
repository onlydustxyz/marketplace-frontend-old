import { FC, PropsWithChildren } from "react";

import Button from "src/components/Button";

type Props = {
  onConnect: () => void;
};

const ConnectButton: FC<PropsWithChildren<Props>> = ({ children, onConnect }) => {
  return (
    <Button theme="primary" onClick={onConnect} size="medium">
      {children}
    </Button>
  );
};

export default ConnectButton;
