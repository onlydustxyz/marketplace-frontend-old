import Button from "./Button";
import { FC } from "react";

type Props = {
  account?: string;
  onConnect: () => void;
};

const ConnectButton: FC<Props> = ({ account, onConnect }) => {
  if (account) {
    return null;
  }

  return (
    <Button theme="secondary" onClick={onConnect}>
      Connect wallet
    </Button>
  );
};

export default ConnectButton;
