import Button from "./Button";
import { FC, PropsWithChildren } from "react";

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
