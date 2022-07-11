import Button from "./Button";
import { FC, PropsWithChildren } from "react";

type Props = {
  account?: string;
  onConnect: () => void;
};

const ConnectButton: FC<PropsWithChildren<Props>> = ({ account, children, onConnect }) => {
  if (account) {
    return null;
  }

  return (
    <Button theme="secondary" onClick={onConnect}>
      {children}
    </Button>
  );
};

export default ConnectButton;
